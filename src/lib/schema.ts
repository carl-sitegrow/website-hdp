import { siteConfig, type BusinessType } from '@/config/site';
import { absoluteUrl, OG_IMAGE } from '@/lib/seo';
import type { Post } from '@/data/posts';

/**
 * Générateurs de données structurées JSON-LD (schema.org).
 *
 * Approche @graph : chaque entité porte un `@id` stable (ancré sur l'URL du site)
 * et les entités se référencent entre elles par `@id` plutôt que d'être dupliquées.
 * C'est la forme recommandée pour le « knowledge graph » d'un site (style Yoast).
 *
 * Le BreadcrumbList est émis séparément par Breadcrumb.astro — on ne le duplique
 * pas ici (Google fusionne les blocs JSON-LD d'une même page).
 */

const rootUrl = (origin: URL) => new URL('/', origin).href;
const orgId = (origin: URL) => `${rootUrl(origin)}#organization`;
const websiteId = (origin: URL) => `${rootUrl(origin)}#website`;
const logoId = (origin: URL) => `${rootUrl(origin)}#logo`;

/** Nœud Organization ou LocalBusiness (entité centrale du site). */
function organizationNode(origin: URL) {
  const url = rootUrl(origin);
  const sameAs = Object.values(siteConfig.social).filter(Boolean) as string[];
  const hasAddress =
    siteConfig.address.street || siteConfig.address.city || siteConfig.address.postalCode;

  // LocalBusiness sans adresse n'a pas de sens : on dégrade en Organization.
  const type: BusinessType =
    siteConfig.businessType === 'LocalBusiness' && !hasAddress
      ? 'Organization'
      : siteConfig.businessType;

  // Logo publisher : le logo configuré, sinon l'image OG par défaut (toujours présente).
  const logoUrl = absoluteUrl(siteConfig.logo || OG_IMAGE.path, origin);

  return {
    '@type': type,
    '@id': orgId(origin),
    name: siteConfig.siteName,
    url,
    description: siteConfig.defaultDescription,
    email: siteConfig.contactEmail,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    logo: {
      '@type': 'ImageObject',
      '@id': logoId(origin),
      url: logoUrl,
      contentUrl: logoUrl,
    },
    image: { '@id': logoId(origin) },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(type === 'LocalBusiness' && hasAddress
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteConfig.address.street,
            addressLocality: siteConfig.address.city,
            addressRegion: siteConfig.address.region,
            postalCode: siteConfig.address.postalCode,
            addressCountry: siteConfig.address.country,
          },
        }
      : {}),
    ...(type === 'LocalBusiness' && siteConfig.openingHours.length > 0
      ? { openingHours: siteConfig.openingHours }
      : {}),
    ...(type === 'LocalBusiness' && siteConfig.geo
      ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: siteConfig.geo.lat,
            longitude: siteConfig.geo.lng,
          },
        }
      : {}),
  };
}

/** Nœud WebSite (active la sitelinks search box potentielle + rattache le publisher). */
function websiteNode(origin: URL, lang: string) {
  return {
    '@type': 'WebSite',
    '@id': websiteId(origin),
    url: rootUrl(origin),
    name: siteConfig.siteName,
    description: siteConfig.defaultDescription,
    publisher: { '@id': orgId(origin) },
    inLanguage: lang,
  };
}

/**
 * Graphe JSON-LD de la page d'accueil :
 * Organization/LocalBusiness + WebSite + WebPage, reliés par @id.
 */
export function buildHomeGraph(origin: URL, opts: { lang?: string } = {}) {
  const lang = opts.lang ?? 'fr-CA';
  const url = rootUrl(origin);

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(origin),
      websiteNode(origin, lang),
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: `${siteConfig.siteName} | ${siteConfig.city}, ${siteConfig.region}`,
        description: siteConfig.defaultDescription,
        isPartOf: { '@id': websiteId(origin) },
        about: { '@id': orgId(origin) },
        inLanguage: lang,
      },
    ],
  };
}

/**
 * Graphe JSON-LD d'un article de blog :
 * Organization + WebSite + WebPage + Article, reliés par @id.
 * Inclut datePublished / dateModified (requis par Google pour les rich results Article)
 * et le publisher.logo (via le nœud Organization).
 */
export function buildArticleGraph(post: Post, origin: URL, opts: { path: string; lang?: string }) {
  const lang = opts.lang ?? 'fr-CA';
  const pageUrl = absoluteUrl(opts.path, origin);
  const images = post.image
    ? [absoluteUrl(`${post.image}.webp`, origin)]
    : [absoluteUrl(OG_IMAGE.path, origin)];
  const datePublished = post.date || undefined;
  const dateModified = post.updated || post.date || undefined;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(origin),
      websiteNode(origin, lang),
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: post.title,
        description: post.summary,
        isPartOf: { '@id': websiteId(origin) },
        inLanguage: lang,
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
      },
      {
        '@type': 'Article',
        '@id': `${pageUrl}#article`,
        headline: post.title,
        description: post.summary,
        image: images,
        inLanguage: lang,
        ...(datePublished ? { datePublished } : {}),
        ...(dateModified ? { dateModified } : {}),
        author: post.author
          ? {
              '@type': 'Person',
              name: post.author.name,
              ...(post.author.role ? { jobTitle: post.author.role } : {}),
            }
          : { '@id': orgId(origin) },
        publisher: { '@id': orgId(origin) },
        mainEntityOfPage: { '@id': `${pageUrl}#webpage` },
        isPartOf: { '@id': `${pageUrl}#webpage` },
      },
    ],
  };
}

/**
 * FAQPage : à alimenter avec une liste question/réponse.
 * Éligible aux rich results FAQ. N'émettre que si la page affiche réellement ces Q/R.
 */
export function buildFaqSchema(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

/**
 * Graphe de services : un nœud Service par prestation, rattaché au provider
 * (Organization) via @id. Inclut le nœud Organization pour l'auto-résolution.
 */
export function buildServicesGraph(
  services: { title: string; description: string }[],
  origin: URL
) {
  const areaServed = siteConfig.region || siteConfig.city || undefined;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      organizationNode(origin),
      ...services.map((s) => ({
        '@type': 'Service',
        name: s.title,
        description: s.description,
        provider: { '@id': orgId(origin) },
        ...(areaServed ? { areaServed } : {}),
      })),
    ],
  };
}
