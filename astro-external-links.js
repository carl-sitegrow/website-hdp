/**
 * Astro integration: processes all generated HTML at build time
 * to add target="_blank" rel="nofollow noopener" to external links.
 *
 * Runs on astro:build:done — modifies static HTML files in place.
 * Works alongside the rehype plugin (markdown) for full coverage.
 *
 * Compatible Astro v4-v6 (routes[]) et v7+ (pages[{pathname}]).
 */
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { join } from 'path';

function getSiteDomains() {
  const domain = process.env.SITE_DOMAIN || 'exemple.com';
  const bare = domain.replace(/^www\./, '');
  return [bare, `www.${bare}`];
}
const SITE_DOMAINS = getSiteDomains();

/** External domains that should keep "follow" (no nofollow). */
const FOLLOW_DOMAINS = [];

function isOwnDomain(hostname) {
  const h = hostname.replace(/^www\./, '');
  return SITE_DOMAINS.some((d) => d.replace(/^www\./, '') === h);
}

function isFollowDomain(hostname) {
  const h = hostname.replace(/^www\./, '');
  return FOLLOW_DOMAINS.some((d) => d.replace(/^www\./, '') === h);
}

function processHtml(html) {
  return html.replace(
    /<a\s([^>]*?)href\s*=\s*"(https?:\/\/[^"]+)"([^>]*?)>/gi,
    (match, before, href, after) => {
      try {
        const url = new URL(href);
        if (isOwnDomain(url.hostname)) return match;

        const full = before + after;
        let newTag = match;

        if (!/target\s*=/i.test(full)) {
          newTag = newTag.replace(/\/?>$/, ' target="_blank">');
        }

        if (!/rel\s*=/i.test(full)) {
          const relValue = isFollowDomain(url.hostname) ? 'noopener' : 'nofollow noopener';
          newTag = newTag.replace(/\/?>$/, ` rel="${relValue}">`);
        }

        return newTag;
      } catch {
        return match;
      }
    }
  );
}

/**
 * Extrait la liste des fichiers HTML à traiter, en gérant :
 *  - Astro v4-v6 (routes[] avec distURL)
 *  - Astro v7+ (pages[{ pathname }]) — fichier résolu via dir/pathname/index.html
 */
function getHtmlFiles({ dir, routes, pages }) {
  const outDir = fileURLToPath(dir);
  const files = [];

  if (Array.isArray(pages)) {
    for (const page of pages) {
      const trimmed = page.pathname.replace(/^\/+/, '').replace(/\/+$/, '');
      const candidate = trimmed ? join(outDir, trimmed, 'index.html') : join(outDir, 'index.html');
      files.push(candidate);
    }
  }

  if (Array.isArray(routes)) {
    for (const route of routes) {
      if (route?.type !== 'page') continue;
      const distURL = route.distURL;
      if (!distURL) continue;
      files.push(fileURLToPath(distURL));
    }
  }

  return [...new Set(files)];
}

export default function externalLinksIntegration() {
  return {
    name: 'external-links',
    hooks: {
      'astro:build:done': async (buildDonePayload) => {
        const files = getHtmlFiles(buildDonePayload);
        let processed = 0;

        for (const filePath of files) {
          if (!filePath.endsWith('.html')) continue;

          try {
            const html = await readFile(filePath, 'utf-8');
            const result = processHtml(html);
            if (result !== html) {
              await writeFile(filePath, result, 'utf-8');
              processed++;
            }
          } catch {
            // Fichier absent (route SSR) — ignore silencieusement
          }
        }

        if (processed > 0) {
          console.log(`[external-links] Processed ${processed} HTML file(s)`);
        }
      },
    },
  };
}
