import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';
import { homeContent } from '@/data/home';
import { contactContent } from '@/data/contact';
import { getPublishedPosts } from '@/data/posts';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href.replace(/\/$/, '') ?? siteConfig.url).replace(/\/$/, '');
  const abs = (p: string) => `${base}${p}`;

  const pages = [
    { title: 'Accueil', href: '/', desc: homeContent.hero.subtitle },
    { title: 'Blog', href: '/blog/', desc: 'Tous les articles Ellea sur le bien-être féminin.' },
    { title: contactContent.hero.title, href: '/contact/', desc: contactContent.hero.subtitle },
  ];

  const posts = getPublishedPosts();
  const out: string[] = [];

  out.push(`# ${siteConfig.siteName}`);
  out.push('');
  out.push(`> ${siteConfig.defaultDescription}`);
  out.push('');
  out.push(`Blog santé et bien-être féminin. Contact : ${siteConfig.contactEmail}.`);
  out.push('');
  out.push('## Pages principales');
  out.push('');
  for (const p of pages) out.push(`- [${p.title}](${abs(p.href)}): ${p.desc}`);
  out.push('');
  out.push('## Articles');
  out.push('');
  for (const post of posts) {
    out.push(`- [${post.title}](${abs(`/blog/${post.slug}/`)}): ${post.summary}`);
  }
  out.push('');
  out.push('## Ressources');
  out.push('');
  out.push(`- [Plan du site](${abs('/plan-du-site/')})`);
  out.push(`- [Sitemap](${abs('/sitemap.xml')})`);
  out.push(`- [Contenu complet](${abs('/llms-full.txt')})`);

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
