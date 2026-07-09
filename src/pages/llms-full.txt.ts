import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';
import { homeContent } from '@/data/home';
import { getPublishedPosts } from '@/data/posts';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href.replace(/\/$/, '') ?? siteConfig.url).replace(/\/$/, '');
  const out: string[] = [];

  out.push(`# ${siteConfig.siteName}`);
  out.push('');
  out.push(`> ${siteConfig.defaultDescription}`);
  out.push('');
  out.push(`Site : ${base}/ · Contact : ${siteConfig.contactEmail}`);
  out.push('');
  out.push('## Accueil');
  out.push('');
  out.push(homeContent.hero.title);
  out.push('');
  out.push(homeContent.hero.subtitle);
  out.push('');

  const posts = getPublishedPosts();
  out.push('## Articles');
  out.push('');
  for (const post of posts) {
    out.push(`### ${post.title}`);
    out.push('');
    out.push(`URL : ${base}/blog/${post.slug}/ · Publié : ${post.date}`);
    out.push('');
    out.push(post.summary);
    out.push('');
    for (const section of post.sections) {
      if (section.heading) {
        out.push(`#### ${section.heading}`);
        out.push('');
      }
      for (const para of section.paragraphs) {
        out.push(para);
        out.push('');
      }
    }
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
