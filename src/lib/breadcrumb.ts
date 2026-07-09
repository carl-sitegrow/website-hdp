export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type Lang = 'fr' | 'en';

/** Libellés localisés pour les éléments récurrents du fil d'Ariane. */
const labels = {
  fr: {
    home: 'Accueil',
    blog: 'Blog',
    about: 'À propos',
    contact: 'Contact',
    services: 'Services',
    privacy: 'Politique de confidentialité',
    notFound: 'Page introuvable',
    plan: 'Plan du site',
  },
  en: {
    home: 'Home',
    blog: 'Blog',
    about: 'About',
    contact: 'Contact',
    services: 'Services',
    privacy: 'Privacy Policy',
    notFound: 'Page not found',
    plan: 'Sitemap',
  },
} as const;

/** Chemins par langue (la racine FR n'a pas de préfixe). */
function localizedPath(path: string, lang: Lang): string {
  if (lang === 'en') return path === '/' ? '/en/' : `/en${path}`;
  return path;
}

function homeItem(lang: Lang): BreadcrumbItem {
  return { label: labels[lang].home, href: localizedPath('/', lang) };
}

/** Constructeur de fil d'Ariane prenant la langue en paramètre. */
export const breadcrumbTrails = {
  blog: (lang: Lang = 'fr'): BreadcrumbItem[] => [homeItem(lang), { label: labels[lang].blog }],
  post: (title: string, lang: Lang = 'fr'): BreadcrumbItem[] => [
    homeItem(lang),
    { label: labels[lang].blog, href: localizedPath('/blog/', lang) },
    { label: title },
  ],
  about: (lang: Lang = 'fr'): BreadcrumbItem[] => [homeItem(lang), { label: labels[lang].about }],
  contact: (lang: Lang = 'fr'): BreadcrumbItem[] => [
    homeItem(lang),
    { label: labels[lang].contact },
  ],
  services: (lang: Lang = 'fr'): BreadcrumbItem[] => [
    homeItem(lang),
    { label: labels[lang].services },
  ],
  privacy: (lang: Lang = 'fr'): BreadcrumbItem[] => [
    homeItem(lang),
    { label: labels[lang].privacy },
  ],
  plan: (lang: Lang = 'fr'): BreadcrumbItem[] => [homeItem(lang), { label: labels[lang].plan }],
  notFound: (lang: Lang = 'fr'): BreadcrumbItem[] => [
    homeItem(lang),
    { label: labels[lang].notFound },
  ],
};

export type SitePageLink = {
  /** Libellé localisé */
  label: string;
  /** Chemin FR (sans slash final doublé) */
  href: string;
  /** Section logique pour le groupement */
  section: 'main' | 'legal';
};

/** Liste centralisée des pages pour le plan du site HTML (FR). */
export const frPagesList: SitePageLink[] = [
  { label: labels.fr.home, href: '/', section: 'main' },
  { label: labels.fr.blog, href: '/blog/', section: 'main' },
  { label: labels.fr.contact, href: '/contact/', section: 'main' },
  { label: labels.fr.privacy, href: '/politique-de-confidentialite/', section: 'legal' },
];

/** Liste centralisée des pages pour le plan du site HTML (EN). */
export const enPagesList: SitePageLink[] = [
  { label: labels.en.home, href: '/en/', section: 'main' },
  { label: labels.en.services, href: '/en/services/', section: 'main' },
  { label: labels.en.blog, href: '/en/blog/', section: 'main' },
  { label: labels.en.about, href: '/en/about/', section: 'main' },
  { label: labels.en.contact, href: '/en/contact/', section: 'main' },
  { label: labels.en.privacy, href: '/en/privacy/', section: 'legal' },
];
