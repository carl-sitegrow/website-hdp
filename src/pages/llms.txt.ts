import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';
import { homeContent } from '@/data/home';
import { servicesContent } from '@/data/services';
import { aboutContent } from '@/data/about';
import { contactContent } from '@/data/contact';
import { getPublishedPosts } from '@/data/posts';

export const prerender = true;

/**
 * /llms.txt — index lisible par les LLM (spec llmstxt.org).
 * Un résumé + des liens curés vers les pages/articles clés, en Markdown.
 * Aide les moteurs génératifs (ChatGPT, Claude, Perplexity, Gemini) à
 * comprendre et citer le site. Alimenté par src/config + src/data.
 */
export const GET: APIRoute = ({ site }) => {
  const base = (site?.href.replace(/\/$/, '') ?? siteConfig.url).replace(/\/$/, '');
  const abs = (p: string) => `${base}${p}`;

  const pages = [
    { title: 'Accueil', href: '/', desc: homeContent.hero.subtitle },
    { title: servicesContent.title, href: '/services/', desc: servicesContent.metaDescription },
    { title: aboutContent.title, href: '/a-propos/', desc: aboutContent.metaDescription },
    { title: contactContent.title, href: '/contact/', desc: contactContent.subtitle },
  ];

  const posts = getPublishedPosts();

  const out: string[] = [];
  out.push(`# ${siteConfig.siteName}`);
  out.push('');
  out.push(`> ${siteConfig.defaultDescription}`);
  out.push('');
  out.push(
    `${siteConfig.siteName} est basé à ${siteConfig.city}, ${siteConfig.region}. ` +
      `Pour toute demande : ${siteConfig.contactEmail}.`
  );
  out.push('');

  out.push('## Pages principales');
  out.push('');
  for (const p of pages) out.push(`- [${p.title}](${abs(p.href)}): ${p.desc}`);
  out.push('');

  out.push('## Blog');
  out.push('');
  if (posts.length > 0) {
    for (const post of posts) {
      out.push(`- [${post.title}](${abs(`/blog/${post.slug}/`)}): ${post.summary}`);
    }
  } else {
    out.push(`- [Blog](${abs('/blog/')}): articles à venir.`);
  }
  out.push('');

  out.push('## Ressources');
  out.push('');
  out.push(`- [Plan du site (HTML)](${abs('/plan-du-site/')})`);
  out.push(`- [Sitemap (XML)](${abs('/sitemap.xml')})`);
  out.push(`- [Contenu complet pour LLM](${abs('/llms-full.txt')})`);
  out.push('');

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
