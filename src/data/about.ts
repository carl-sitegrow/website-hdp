export const aboutContent = {
  title: 'À propos',
  metaDescription: 'Présentation de l’entreprise — à personnaliser dans src/data/about.ts.',
  intro: [
    'Paragraphe d’introduction — remplacez ce texte par l’histoire de votre entreprise et ce qui vous anime.',
    'Second paragraphe d’introduction : votre mission, votre approche, votre public cible.',
  ],
  values: {
    title: 'Nos valeurs',
    items: [
      {
        title: 'Valeur 1',
        description: 'Description courte d’une valeur clé.',
      },
      {
        title: 'Valeur 2',
        description: 'Description courte d’une valeur clé.',
      },
      {
        title: 'Valeur 3',
        description: 'Description courte d’une valeur clé.',
      },
    ],
  },
  team: {
    title: 'L’équipe',
    items: [
      {
        name: 'Nom du membre',
        role: 'Rôle / titre',
        bio: 'Courte bio — parcours, expertise et ce qu’il apporte à l’équipe.',
        image: '/images/team/member-1',
      },
    ],
  },
  cta: {
    text: 'Texte d’appel à l’action en bas de page À propos. Invitez le visiteur à vous contacter.',
    button: { label: 'Nous joindre', href: '/contact/' },
  },
} as const;
