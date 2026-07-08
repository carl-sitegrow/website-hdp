export type Service = {
  title: string;
  description: string;
  image: string;
  imageAlt?: string;
  features?: string[];
  reverse?: boolean;
  cta?: { label: string; href: string };
};

export const servicesContent = {
  title: 'Nos services',
  metaDescription: 'Description de la page Services — à personnaliser dans src/data/services.ts.',
  intro:
    'Présentez ici vos services principaux. Chaque carte peut inclure une image, une description, des points clés et un appel à l’action.',
  /**
   * FAQ optionnelle (éligible aux rich results FAQPage).
   * N'ajoutez des entrées QUE si ces questions/réponses sont réellement affichées
   * sur la page — sinon Google peut considérer ça comme du balisage trompeur.
   */
  faq: [] as { question: string; answer: string }[],
};

export const services: Service[] = [
  {
    title: 'Service 1',
    description: 'Décrivez ce service : ce qu’il inclut, pour qui, et le résultat attendu.',
    image: '/images/services/service-1',
    imageAlt: '',
    features: ['Point clé 1', 'Point clé 2', 'Point clé 3'],
    reverse: false,
  },
  {
    title: 'Service 2',
    description: 'Décrivez ce service : ce qu’il inclut, pour qui, et le résultat attendu.',
    image: '/images/services/service-2',
    imageAlt: '',
    features: ['Point clé 1', 'Point clé 2', 'Point clé 3'],
    reverse: true,
  },
  {
    title: 'Service 3',
    description: 'Décrivez ce service : ce qu’il inclut, pour qui, et le résultat attendu.',
    image: '/images/services/service-3',
    imageAlt: '',
    features: ['Point clé 1', 'Point clé 2', 'Point clé 3'],
    reverse: false,
  },
];

export const processSteps = [
  {
    number: '01',
    title: 'Découverte',
    description: 'Comprendre vos besoins, vos objectifs et votre contexte.',
  },
  {
    number: '02',
    title: 'Planification',
    description: 'Structurer la démarche et établir un échéancier clair.',
  },
  {
    number: '03',
    title: 'Exécution',
    description: 'Mettre en œuvre les actions convenues avec soin.',
  },
  {
    number: '04',
    title: 'Livraison',
    description: 'Valider, livrer et assurer un suivi après projet.',
  },
];
