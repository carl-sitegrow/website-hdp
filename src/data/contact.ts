export const contactContent = {
  title: 'Nous joindre',
  subtitle:
    'Une question, un projet ou une demande de soumission ? Écrivez-nous, on vous répond rapidement.',
  blocks: [
    {
      title: 'Bloc 1',
      text: 'Décrivez ici un type de demande (information générale, partenariat, etc.).',
    },
    {
      title: 'Bloc 2',
      text: 'Décrivez ici un autre type de demande (devis, soutien technique, etc.).',
    },
    {
      title: 'Bloc 3',
      text: 'Décrivez ici un troisième type de demande pertinent.',
    },
  ],
  topics: [
    { value: 'general', label: 'Demande générale' },
    { value: 'quote', label: 'Demande de soumission' },
    { value: 'partnership', label: 'Partenariat' },
    { value: 'other', label: 'Autre' },
  ],
  form: {
    title: 'Envoyez-nous un message',
    name: 'Nom',
    email: 'Adresse courriel',
    topic: 'Sujet',
    message: 'Message',
    placeholder: 'Votre message…',
    submit: 'Envoyer',
    submitting: 'Envoi…',
    successTitle: 'Message envoyé',
    successMessage:
      'Merci ! Votre message a bien été envoyé. Nous vous répondrons dans les plus brefs délais.',
    successReset: 'Envoyer un autre message',
    errorGeneric:
      'Une erreur est survenue. Veuillez réessayer ou nous écrire directement par courriel.',
    errorNetwork: 'Connexion impossible. Vérifiez votre réseau et réessayez.',
    notConfiguredTitle: 'Formulaire non configuré',
    notConfiguredMessage:
      'Définissez PUBLIC_FORMSPREE_ID dans votre fichier .env pour activer le formulaire. Créez un formulaire gratuit sur formspree.io/forms.',
    fallbackCta: 'Écrivez-nous par courriel',
  },
} as const;
