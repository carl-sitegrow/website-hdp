import { images } from '@/data/images';

export const homeContent = {
  hero: {
    title: "Prenez soin de vous, de l'intérieur",
    subtitle:
      'Découvrez des conseils experts pour une santé équilibrée, des astuces bien-être et des partages inspirants pour chaque étape de votre vie.',
    image: images.heroHome,
    imageAlt: 'Ambiance douce et apaisante pour le bien-être féminin',
  },
  themesTitle: 'Explorer par thème',
  featuredTitle: 'Articles à la une',
  featuredLink: { label: 'Voir tout', href: '/blog/' },
  recentTitle: 'Articles récents',
  featuredSlugs: [
    'rituel-matin-journee-sereine',
    'super-aliments-cycle-feminin',
    'impact-sommeil-sante-mentale',
  ],
} as const;
