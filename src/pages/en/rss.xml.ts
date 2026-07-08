import type { APIRoute } from 'astro';
import { buildRssFeed } from '@/lib/rss';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href.replace(/\/$/, '') ?? '').replace(/\/$/, '');
  const xml = buildRssFeed(site, {
    langPrefix: '/en',
    language: 'en-CA',
    selfUrl: `${base}/en/rss.xml`,
    // Le modèle de données n'a pas encore de posts EN — le flux est valide mais vide
    // pour l'instant. Quand des traductions EN existeront, remplacer filterPosts.
    filterPosts: () => [],
  });
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
