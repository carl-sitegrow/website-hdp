export const privacyContent = {
  title: 'Politique de confidentialité',
  metaDescription:
    'Politique de confidentialité — à personnaliser dans src/data/privacy.ts et faire valider par un conseiller juridique avant publication.',
  lastUpdated: '[Date]',
  legalEntity: '[Entité légale, à compléter]',
  brandName: '[Marque]',
  sections: [
    {
      title: '1. Renseignements que nous recueillons',
      paragraphs: ['Nous recueillons uniquement les renseignements nécessaires à nos activités :'],
      list: [
        'Renseignements que vous nous fournissez : nom, courriel, contenu des messages (formulaires, infolettre, etc.).',
        'Renseignements recueillis automatiquement : adresse IP, type d’appareil, navigateur, pages consultées.',
      ],
    },
    {
      title: '2. Utilisation de vos renseignements',
      paragraphs: ['Nous utilisons vos renseignements pour :'],
      list: [
        'Vous répondre et traiter vos demandes',
        'Vous envoyer les communications que vous avez demandées',
        'Améliorer notre site et nos services',
        'Respecter nos obligations légales',
      ],
      afterList: 'Nous ne vendons jamais vos renseignements personnels.',
    },
    {
      title: '3. Partage de vos renseignements',
      paragraphs: [
        'Nous pouvons partager certains renseignements avec des fournisseurs de services (hébergement, infolettre, analyses). Ces fournisseurs sont tenus de protéger vos renseignements.',
      ],
    },
    {
      title: '4. Témoins',
      paragraphs: [
        'Notre site peut utiliser des témoins pour assurer son bon fonctionnement et mesurer la fréquentation.',
      ],
    },
    {
      title: '5. Conservation',
      paragraphs: [
        'Nous conservons vos renseignements aussi longtemps que nécessaire, puis nous les détruisons ou les anonymisons.',
      ],
    },
    {
      title: '6. Vos droits',
      paragraphs: [
        'Vous pouvez accéder à vos renseignements, les faire rectifier ou demander leur suppression. Pour exercer ces droits, écrivez-nous aux coordonnées ci-dessous.',
      ],
    },
    {
      title: '7. Sécurité',
      paragraphs: [
        'Nous mettons en place des mesures raisonnables pour protéger vos renseignements.',
      ],
    },
    {
      title: '8. Responsable de la protection des renseignements personnels',
      paragraphs: [
        'Pour toute question, communiquez avec notre responsable de la protection des renseignements personnels :',
      ],
    },
    {
      title: '9. Modifications',
      paragraphs: [
        'Nous pouvons mettre à jour cette politique de temps à autre. La date de la dernière mise à jour figure en haut de cette page.',
      ],
    },
  ],
  officer: {
    name: '[Nom du responsable, à compléter]',
    email: 'confidentialite@exemple.com',
    address: '[Adresse postale, à compléter]',
  },
  disclaimer:
    'Ce document est un gabarit conforme à l’esprit de la Loi 25 du Québec. Il doit être validé par un conseiller juridique avant publication et ne constitue pas un avis légal.',
} as const;
