import type { APIRoute } from 'astro';
import { buildRssFeed } from '@/lib/rss';

export const prerender = true;

export const GET: APIRoute = ({ site }) => {
  const base = (site?.href.replace(/\/$/, '') ?? '').replace(/\/$/, '');
  const xml = buildRssFeed(site, {
    langPrefix: '',
    language: 'fr-CA',
    selfUrl: `${base}/rss.xml`,
  });
  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
