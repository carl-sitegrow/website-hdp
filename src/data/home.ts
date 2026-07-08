export const homeContent = {
  hero: {
    eyebrow: 'À propos de nous',
    title: ['Titre principal du hero.', 'Une seconde ligne pour l’impact.'],
    subtitle:
      'Sous-titre du hero — remplacez ce texte par un résumé clair de votre proposition de valeur dans src/data/home.ts.',
    primaryCta: { label: 'Appel à l’action principal', href: '/contact/' },
    secondaryCta: { label: 'Voir nos services', href: '/services/' },
  },
  features: {
    eyebrow: 'Nos avantages',
    title: 'Pourquoi nous choisir',
    subtitle:
      'Quelques arguments clés qui distinguent votre entreprise — modifiables dans src/data/home.ts.',
    items: [
      {
        title: 'Avantage 1',
        description:
          'Décrivez un premier avantage concret pour vos clients (qualité, rapidité, expertise locale…).',
      },
      {
        title: 'Avantage 2',
        description:
          'Décrivez un second avantage distinctif (service sur mesure, accompagnement, etc.).',
      },
      {
        title: 'Avantage 3',
        description: 'Décrivez un troisième avantage pertinent pour votre marché cible.',
      },
    ],
  },
} as const;
