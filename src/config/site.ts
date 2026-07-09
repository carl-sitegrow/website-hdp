/**
 * Configuration maîtresse du site Ellea.
 */
export type BusinessType = 'Organization' | 'LocalBusiness' | 'WebSite';

export const siteConfig = {
  siteName: 'Ellea',
  city: 'Paris',
  region: 'France',
  domain: 'ellea.fr',
  url: 'https://ellea.fr',
  defaultDescription:
    'Découvrez des conseils experts pour une santé équilibrée, des astuces bien-être et des partages inspirants pour chaque étape de votre vie.',
  enIndexable: false,
  contactEmail: 'contact@ellea.fr',
  phone: '',
  logo: '',
  twitterHandle: '',
  allowAiCrawlers: true,
  address: {
    street: '',
    city: '',
    region: '',
    postalCode: '',
    country: '',
  },
  businessType: 'Organization' as BusinessType,
  openingHours: [] as string[],
  geo: undefined as { lat: number; lng: number } | undefined,
  social: {
    instagram: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    x: '',
  },
  nav: [
    { label: 'Bien-être', href: '/blog/?categorie=bien-etre' },
    { label: 'Corps', href: '/blog/?categorie=corps' },
    { label: 'Mental', href: '/blog/?categorie=mental' },
    { label: 'Nutrition', href: '/blog/?categorie=nutrition' },
  ],
  navCta: { label: 'Newsletter', href: '#newsletter' },
  footer: {
    tagline:
      'Un espace dédié à la santé et au bien-être féminin. Parce que prendre soin de soi est le plus beau des engagements.',
    columns: [
      {
        title: 'Explorer',
        links: [
          { label: 'Bien-être', href: '/blog/?categorie=bien-etre' },
          { label: 'Corps', href: '/blog/?categorie=corps' },
          { label: 'Mental', href: '/blog/?categorie=mental' },
          { label: 'Nutrition', href: '/blog/?categorie=nutrition' },
          { label: 'Cycle', href: '/blog/?categorie=corps' },
        ],
      },
      {
        title: 'Ellea',
        links: [{ label: 'Contact', href: '/contact/' }],
      },
    ],
    legal: {
      links: [{ label: 'Politique de confidentialité', href: '/politique-de-confidentialite/' }],
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;
