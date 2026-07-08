import type { APIRoute } from 'astro';
import { getPublishedPosts } from '@/data/posts';
import { siteConfig } from '@/config/site';
import { gitLastmod } from '@/lib/git-lastmod';

export const prerender = true;

/**
 * Fichiers source par route — servent à calculer un <lastmod> RÉEL via git
 * (date du dernier commit touchant la page ou ses données). Voir lib/git-lastmod.
 */
const PAGE_SOURCES: Record<string, string[]> = {
  '/': ['src/pages/index.astro', 'src/data/home.ts'],
  '/a-propos/': ['src/pages/a-propos/index.astro', 'src/data/about.ts'],
  '/blog/': ['src/pages/blog/index.astro', 'src/data/posts.ts'],
  '/contact/': ['src/pages/contact/index.astro', 'src/data/contact.ts'],
  '/services/': ['src/pages/services/index.astro', 'src/data/services.ts'],
  '/politique-de-confidentialite/': [
    'src/pages/politique-de-confidentialite/index.astro',
    'src/data/privacy.ts',
  ],
  '/plan-du-site/': ['src/pages/plan-du-site/index.astro'],
  '/en/': ['src/pages/en/index.astro', 'src/data/home.ts'],
  '/en/about/': ['src/pages/en/about/index.astro', 'src/data/about.ts'],
  '/en/blog/': ['src/pages/en/blog/index.astro', 'src/data/posts.ts'],
  '/en/contact/': ['src/pages/en/contact/index.astro', 'src/data/contact.ts'],
  '/en/services/': ['src/pages/en/services/index.astro', 'src/data/services.ts'],
  '/en/privacy/': ['src/pages/en/privacy/index.astro', 'src/data/privacy.ts'],
  '/en/plan-du-site/': ['src/pages/en/plan-du-site/index.astro'],
};

/**
 * Pages statiques du site FR.
 * Liste maintenue à la main — garder synchronisée avec src/pages/*.astro
 * (et ne lister que des routes qui existent réellement, sinon 404 dans le sitemap).
 */
const FR_STATIC_PAGES = [
  '/',
  '/a-propos/',
  '/blog/',
  '/contact/',
  '/services/',
  '/politique-de-confidentialite/',
  '/plan-du-site/',
];

/**
 * Miroirs EN — uniquement les pages qui existent réellement sous src/pages/en/.
 * /en/blog/[slug]/ n'est pas listée (générée dynamiquement dans le sitemap).
 */
const EN_STATIC_PAGES = [
  '/en/',
  '/en/about/',
  '/en/blog/',
  '/en/contact/',
  '/en/services/',
  '/en/privacy/',
  '/en/plan-du-site/',
];

type Alternate = { hreflang: string; href: string };

function buildAlternates(frPath: string, base: string): Alternate[] {
  const enPath = frPath === '/' ? '/en/' : `/en${frPath}`;
  const alts: Alternate[] = [{ hreflang: 'fr-CA', href: `${base}${frPath}` }];
  // N'inclure l'alternative EN que si le miroir anglais est indexable.
  if (siteConfig.enIndexable) {
    alts.push({ hreflang: 'en-CA', href: `${base}${enPath}` });
  }
  alts.push({ hreflang: 'x-default', href: `${base}${frPath}` });
  return alts;
}

function renderAlternates(alts: Alternate[]): string {
  return alts
    .map((a) => `      <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
    .join('\n');
}

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href.replace(/\/$/, '') ?? siteConfig.url).replace(/\/$/, '');

  type Entry = {
    loc: string;
    lastmod?: string;
    alts: Alternate[];
  };

  const entries: Entry[] = [];

  // Pages statiques FR — <lastmod> réel dérivé de git (undefined si git absent).
  for (const p of FR_STATIC_PAGES) {
    entries.push({
      loc: `${base}${p}`,
      lastmod: gitLastmod(PAGE_SOURCES[p] ?? []),
      alts: buildAlternates(p, base),
    });
  }

  // Pages EN — uniquement si le miroir anglais est traduit et indexable.
  if (siteConfig.enIndexable) {
    for (const p of EN_STATIC_PAGES) {
      const frPath = p === '/en/' ? '/' : p.replace(/^\/en(\/|$)/, '/');
      entries.push({
        loc: `${base}${p}`,
        lastmod: gitLastmod(PAGE_SOURCES[p] ?? []),
        alts: buildAlternates(frPath, base),
      });
    }
  }

  // Articles de blog FR — <lastmod> réel (date de modif ou de publication).
  for (const post of getPublishedPosts()) {
    const path = `/blog/${post.slug}/`;
    entries.push({
      loc: `${base}${path}`,
      lastmod: post.updated || post.date || undefined,
      alts: buildAlternates(path, base),
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries
  .map(
    (e) =>
      `  <url>
    <loc>${e.loc}</loc>${e.lastmod ? `\n    <lastmod>${e.lastmod}</lastmod>` : ''}
${renderAlternates(e.alts)}
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
