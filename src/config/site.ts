/**
 * Configuration maîtresse du site.
 * À personnaliser pour chaque projet (voir README.md).
 */
export type BusinessType = 'Organization' | 'LocalBusiness' | 'WebSite';

export const siteConfig = {
  /** Nom commercial affiché dans le header, footer, SEO, etc. */
  siteName: 'Sitegrow Skeleton',
  /** Ville principale (utilisée dans le footer, le SEO local, les JSON-LD). */
  city: 'Ville',
  /** Région / province / État (ex. « Québec », « Île-de-France »). */
  region: 'Région',
  /** Domaine canonique sans protocol ni slash final (ex. « exemple.com »). */
  domain: 'exemple.com',
  /** URL canonique complète, sans slash final (ex. « https://exemple.com »). */
  url: 'https://exemple.com',
  /** Description par défaut utilisée en SEO quand aucune description n’est fournie. */
  defaultDescription: 'Description par défaut du site — à remplacer dans src/config/site.ts.',
  /**
   * Le miroir anglais (/en/) est-il réellement traduit et prêt à être indexé ?
   * `false` (défaut sûr) : les pages /en/ sont `noindex`, exclues du hreflang et
   * du sitemap — évite d'indexer du contenu FR sous des URLs EN (duplication).
   * Passer à `true` UNIQUEMENT une fois src/data/* traduit en anglais.
   */
  enIndexable: false,
  /** Courriel de contact public. */
  contactEmail: 'info@exemple.com',
  /** Téléphone format affichage (optionnel). */
  phone: '',
  /**
   * Logo de la marque (chemin depuis /public, avec extension) utilisé comme
   * publisher.logo dans les JSON-LD. Vide = repli sur l'image OG par défaut.
   * Idéalement un PNG carré ≥ 112 px. Ex. '/images/logo/logo.png'.
   */
  logo: '',
  /** Handle X/Twitter avec @ (ex. '@marque') pour les Twitter Cards. Vide = masqué. */
  twitterHandle: '',
  /**
   * Autoriser les crawlers IA / moteurs génératifs (GPTBot, ClaudeBot,
   * PerplexityBot, Google-Extended…) dans robots.txt.
   * `true` (défaut) = visibilité maximale dans les réponses IA (GEO).
   * `false` = bloque explicitement ces robots (Disallow: /).
   */
  allowAiCrawlers: true,
  /** Adresse postale structurée (optionnel — déclenche le schema LocalBusiness). */
  address: {
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
  },
  /**
   * Type d'entité pour le JSON-LD sur la home.
   * - 'Organization' (défaut) : entreprise sans adresse physique
   * - 'LocalBusiness' : commerce/local avec adresse + heures (SEO local)
   */
  businessType: 'Organization' as BusinessType,
  /** Heures d'ouverture (schema LocalBusiness). Tableau vide = masqué. */
  openingHours: [] as string[],
  /** Coordonnées géographiques (schema LocalBusiness). */
  geo: undefined as { lat: number; lng: number } | undefined,
  /** Liens vers les réseaux sociaux (vide = masqué). */
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    x: '',
  },
  /** Navigation principale (header). */
  nav: [
    { label: 'Services', href: '/services/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'À propos', href: '/a-propos/' },
    { label: 'Contact', href: '/contact/' },
  ],
  /** Appel à l’action principal du header. */
  navCta: { label: 'Nous joindre', href: '/contact/' },
  /** Pied de page. */
  footer: {
    tagline: 'Tagline du site — à remplacer dans src/config/site.ts.',
    columns: [
      {
        title: 'Navigation',
        links: [
          { label: 'Services', href: '/services/' },
          { label: 'Blog', href: '/blog/' },
          { label: 'À propos', href: '/a-propos/' },
          { label: 'Contact', href: '/contact/' },
        ],
      },
    ],
    legal: {
      links: [{ label: 'Politique de confidentialité', href: '/politique-de-confidentialite/' }],
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
