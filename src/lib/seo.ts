import { siteConfig } from '@/config/site';

/**
 * Helpers SEO centralisés : image Open Graph par défaut, directive robots,
 * URL absolues et formatage de titres.
 * Utilisés par SeoHead, PageLayout et lib/schema.ts.
 */

/**
 * Image Open Graph par défaut (public/images/og-default.png).
 * PNG plutôt que WebP pour une compatibilité maximale (LinkedIn, anciens crawlers).
 * Dimensions 1200×630 = ratio recommandé par Facebook/X/LinkedIn.
 */
export const OG_IMAGE = {
  path: '/images/og-default.png',
  width: 1200,
  height: 630,
  type: 'image/png',
} as const;

/**
 * Directive robots par défaut : indexable + aperçus riches.
 * `max-image-preview:large` autorise les grandes vignettes dans Google.
 */
export const DEFAULT_ROBOTS =
  'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';

/** Construit une URL absolue à partir d'un chemin relatif et de l'origine du site. */
export function absoluteUrl(path: string, site: URL): string {
  return new URL(path, site).href;
}

/**
 * Assemble un <title> au format « Page | Marque ».
 * Passer `{ brand: false }` pour un titre déjà complet (ex. la home).
 */
export function formatTitle(title: string, opts: { brand?: boolean } = {}): string {
  const { brand = true } = opts;
  return brand ? `${title} | ${siteConfig.siteName}` : title;
}
