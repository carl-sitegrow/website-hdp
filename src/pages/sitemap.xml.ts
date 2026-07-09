import type { APIRoute } from 'astro';
import { getPublishedPosts, POSTS_PER_PAGE } from '@/data/posts';
import { siteConfig } from '@/config/site';
import { gitLastmod } from '@/lib/git-lastmod';

export const prerender = true;

const PAGE_SOURCES: Record<string, string[]> = {
  '/': ['src/pages/index.astro', 'src/data/home.ts'],
  '/blog/': ['src/pages/blog/index.astro', 'src/data/posts.ts'],
  '/contact/': ['src/pages/contact/index.astro', 'src/data/contact.ts'],
  '/politique-de-confidentialite/': [
    'src/pages/politique-de-confidentialite/index.astro',
    'src/data/privacy.ts',
  ],
  '/plan-du-site/': ['src/pages/plan-du-site/index.astro'],
};

const FR_STATIC_PAGES = ['/', '/blog/', '/contact/', '/politique-de-confidentialite/', '/plan-du-site/'];

type Alternate = { hreflang: string; href: string };

function buildAlternates(frPath: string, base: string): Alternate[] {
  return [
    { hreflang: 'fr-CA', href: `${base}${frPath}` },
    { hreflang: 'x-default', href: `${base}${frPath}` },
  ];
}

function renderAlternates(alts: Alternate[]): string {
  return alts
    .map((a) => `      <xhtml:link rel="alternate" hreflang="${a.hreflang}" href="${a.href}"/>`)
    .join('\n');
}

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href.replace(/\/$/, '') ?? siteConfig.url).replace(/\/$/, '');
  const allPosts = getPublishedPosts();
  const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);

  type Entry = { loc: string; lastmod?: string; alts: Alternate[] };
  const entries: Entry[] = [];

  for (const p of FR_STATIC_PAGES) {
    entries.push({
      loc: `${base}${p}`,
      lastmod: gitLastmod(PAGE_SOURCES[p] ?? []),
      alts: buildAlternates(p, base),
    });
  }

  for (let page = 2; page <= totalPages; page++) {
    const path = `/blog/page/${page}/`;
    entries.push({
      loc: `${base}${path}`,
      lastmod: gitLastmod(PAGE_SOURCES['/blog/'] ?? []),
      alts: buildAlternates('/blog/', base),
    });
  }

  for (const post of allPosts) {
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
  </url>`,
  )
  .join('\n')}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
