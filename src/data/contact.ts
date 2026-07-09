export const contactContent = {
  hero: {
    title: 'Nous contacter',
    subtitle:
      "Une question, une suggestion ou simplement envie d'échanger ? Nous sommes là.",
  },
  details: {
    title: 'Informations de contact',
    email: 'contact@ellea.fr',
  },
  form: {
    firstName: 'Prénom',
    firstNamePlaceholder: 'Votre prénom',
    lastName: 'Nom',
    lastNamePlaceholder: 'Votre nom',
    email: 'Email',
    emailPlaceholder: 'votre@email.com',
    subject: 'Sujet',
    subjectPlaceholder: 'Objet de votre message',
    message: 'Message',
    messagePlaceholder: 'Écrivez votre message...',
    submit: 'Envoyer le message',
    submitting: 'Envoi…',
    successTitle: 'Message envoyé !',
    successMessage: 'Merci pour votre message. Nous vous répondrons dans les plus brefs délais.',
    successReset: 'Envoyer un autre message',
    errorGeneric: 'Une erreur est survenue. Veuillez réessayer.',
    errorNetwork: 'Erreur réseau. Vérifiez votre connexion.',
    notConfiguredTitle: 'Formulaire non configuré',
    notConfiguredMessage:
      'Définissez PUBLIC_FORMSPREE_ID dans votre fichier .env pour activer le formulaire de contact.',
    fallbackCta: 'Nous écrire par courriel',
  },
} as const;

export const newsletterContent = {
  title: 'Restons connectées',
  subtitle:
    'Inscrivez-vous à notre newsletter pour recevoir nos derniers articles et des surprises exclusives directement dans votre boîte mail.',
  emailPlaceholder: 'votre@email.com',
  submit: "S'inscrire",
  submitting: 'Inscription…',
  success: 'Merci ! Vous êtes inscrite à notre newsletter.',
  error: 'Une erreur est survenue. Veuillez réessayer.',
} as const;
