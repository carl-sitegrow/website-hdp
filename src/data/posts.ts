import { images } from '@/data/images';

export type PostSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
  /** Image inline avec légende optionnelle */
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  updated?: string;
  category: string;
  categorySlug: string;
  summary: string;
  published: boolean;
  image: string;
  imageAlt: string;
  readingTime: number;
  featured?: boolean;
  tags?: string[];
  pullQuote?: { text: string };
  author: {
    name: string;
    role: string;
    image: string;
    bio?: string;
  };
  sections: PostSection[];
  relatedSlugs?: string[];
};

export const postUi = {
  backLink: 'Retour au blog',
  listTitle: 'Tous les articles',
  listSubtitle:
    'Explorez nos dossiers, conseils et rituels pour une vie équilibrée et une santé épanouie.',
  readArticle: "Lire l'article",
  readTime: 'min',
  relatedTitle: 'Vous aimerez aussi',
  comingSoon: 'Bientôt disponible',
} as const;

export const posts: Post[] = [
  {
    slug: 'guide-alimentaire-cycle-feminin',
    title: 'Le guide alimentaire du cycle féminin : comment nourrir son corps chaque semaine',
    date: '2024-05-18',
    category: 'Bien-être',
    categorySlug: 'bien-etre',
    summary:
      'Comprendre les besoins nutritionnels de notre corps tout au long du mois est la clé d’un équilibre hormonal durable.',
    published: true,
    image: images.blog.guideHero,
    imageAlt: 'Femme en méditation dans une pièce lumineuse',
    readingTime: 10,
    tags: ['Nutrition', 'Hormones', 'Cycle Féminin', 'Bien-être', 'Alimentation'],
    pullQuote: {
      text: "L'alimentation n'est pas seulement du carburant, c'est une information que nous donnons à nos hormones chaque jour.",
    },
    author: {
      name: 'Julie Leman',
      role: 'Naturopathe',
      image: images.authors.julieLeman,
      bio: "Naturopathe spécialisée dans l'équilibre hormonal féminin, Julie partage ses connaissances pour aider les femmes à vivre en harmonie avec leur biologie naturelle à travers une approche holistique et bienveillante.",
    },
    sections: [
      {
        paragraphs: [
          "Comprendre les besoins nutritionnels de notre corps tout au long du mois est la clé d'un équilibre hormonal durable. Trop souvent, nous ignorons les signaux subtils que notre corps nous envoie, attendant que la fatigue ou l'inconfort s'installe pour agir. En adaptant notre alimentation aux quatre phases du cycle féminin, nous pouvons non seulement réduire les symptômes désagréables, mais aussi booster notre énergie naturelle.",
        ],
      },
      {
        paragraphs: [
          "La nutrition cyclique consiste à adapter son assiette aux quatre phases : menstruelle, folliculaire, ovulatoire et lutéale. Chaque phase demande des nutriments spécifiques pour soutenir la production hormonale et maintenir un niveau de glycémie stable, évitant ainsi les pics d'insuline responsables de l'acné ou de l'irritabilité.",
        ],
      },
      {
        heading: 'La phase lutéale : privilégier le magnésium',
        paragraphs: [
          "Durant la phase lutéale (les jours précédant les règles), le corps a besoin de plus de calories et de nutriments stabilisateurs d'humeur. C'est le moment idéal pour intégrer des légumes racines comme la patate douce, riches en fibres et en vitamine B6, qui aident à la synthèse de la sérotonine.",
        ],
        image: images.blog.guideInline,
        imageAlt: 'Bol coloré de légumes frais et vivants',
        imageCaption:
          'Préparer des repas colorés et vivants aide à se reconnecter à ses besoins profonds.',
      },
      {
        paragraphs: [
          "Enfin, n'oubliez pas l'importance de l'hydratation. Boire des tisanes de framboisier ou d'ortie peut grandement aider à minéraliser le corps en vue des jours de flux. Prendre le temps de cuisiner pour soi est un acte de self-care puissant qui envoie un message positif à votre système nerveux.",
        ],
      },
    ],
    relatedSlugs: [
      'rituel-matin-journee-sereine',
      'super-aliments-cycle-feminin',
      'meditation-debutante-guide',
    ],
  },
  {
    slug: 'rituel-matin-journee-sereine',
    title: 'Le rituel du matin pour une journée sereine',
    date: '2024-05-12',
    category: 'Bien-être',
    categorySlug: 'bien-etre',
    summary:
      'Commencer la journée sans stress est un art. Découvrez nos 5 étapes pour un réveil en douceur qui change tout.',
    published: true,
    featured: true,
    image: images.blog.rituelMatin,
    imageAlt: 'Femme méditant dans une pièce ensoleillée',
    readingTime: 8,
    author: {
      name: 'Julie L.',
      role: 'Rédactrice bien-être',
      image: images.authors.julieLeman,
    },
    sections: [
      {
        paragraphs: [
          'Les premières minutes après le réveil définissent souvent le ton de toute la journée. En créant un rituel matinal intentionnel, vous offrez à votre corps et à votre esprit un espace pour s’ancrer avant d’affronter le monde.',
        ],
      },
    ],
    relatedSlugs: ['super-aliments-cycle-feminin', 'meditation-debutante-guide'],
  },
  {
    slug: 'super-aliments-cycle-feminin',
    title: 'Les super-aliments du cycle féminin',
    date: '2024-05-08',
    category: 'Nutrition',
    categorySlug: 'nutrition',
    summary:
      "Adapter son alimentation à son cycle hormonal permet de mieux vivre son mois. Voici ce qu'il faut privilégier.",
    published: true,
    featured: true,
    image: images.blog.superAliments,
    imageAlt: 'Bol coloré de super-aliments frais',
    readingTime: 7,
    author: {
      name: 'Marie V.',
      role: 'Nutritionniste',
      image: images.authors.marieV,
    },
    sections: [
      {
        paragraphs: [
          'Chaque phase du cycle féminin demande des nutriments spécifiques. En phase menstruelle, privilégiez le fer et le magnésium ; en phase folliculaire, les légumes verts et les protéines légères soutiennent la montée d’énergie.',
        ],
      },
    ],
    relatedSlugs: ['guide-alimentaire-cycle-feminin', 'granola-maison-sans-sucre'],
  },
  {
    slug: 'granola-maison-sans-sucre',
    title: 'Le granola maison sans sucre ajouté',
    date: '2024-05-08',
    category: 'Nutrition',
    categorySlug: 'nutrition',
    summary:
      'Une recette simple, croquante et saine pour vos petits-déjeuners équilibrés, sans pic de glycémie.',
    published: true,
    image: images.blog.granola,
    imageAlt: 'Bol de granola aux fruits rouges',
    readingTime: 6,
    author: {
      name: 'Marie V.',
      role: 'Nutritionniste',
      image: images.authors.marieV,
    },
    sections: [
      {
        paragraphs: [
          'Préparer son granola permet de contrôler les ingrédients et d’éviter les sucres cachés des versions industrielles. Flocons d’avoine, amandes, graines de courge et une touche de cannelle suffisent pour un petit-déjeuner nourrissant.',
        ],
      },
    ],
  },
  {
    slug: 'impact-sommeil-sante-mentale',
    title: "L'impact du sommeil sur votre santé mentale",
    date: '2024-05-05',
    category: 'Mental',
    categorySlug: 'mental',
    summary:
      "Une mauvaise nuit n'est pas qu'une question de fatigue. Découvrez pourquoi votre cerveau a besoin de dormir.",
    published: true,
    featured: true,
    image: images.blog.impactSommeil,
    imageAlt: 'Mains tenant une tasse de thé dans un lit douillet',
    readingTime: 7,
    author: {
      name: 'Claire B.',
      role: 'Coach mindfulness',
      image: images.authors.claireB,
    },
    sections: [
      {
        paragraphs: [
          'Le sommeil régule l’humeur, la concentration et la résilience émotionnelle. Un déficit chronique perturbe la production de sérotonine et amplifie le stress perçu au quotidien.',
        ],
      },
    ],
    relatedSlugs: ['meditation-debutante-guide', 'rituel-matin-journee-sereine'],
  },
  {
    slug: 'yoga-doux-apaisant',
    title: 'Yoga doux : une pratique apaisante pour le corps',
    date: '2024-05-02',
    category: 'Sport',
    categorySlug: 'corps',
    summary: 'Des postures accessibles pour relâcher les tensions et retrouver de la mobilité en douceur.',
    published: true,
    image: images.blog.yoga,
    imageAlt: 'Femme pratiquant le yoga sur un tapis',
    readingTime: 5,
    author: {
      name: 'Équipe Ellea',
      role: 'Rédaction',
      image: images.authors.equipeEllea,
    },
    sections: [
      {
        paragraphs: [
          'Le yoga doux invite à écouter son corps sans performance. Quelques postures d’ouverture et d’étirement suffisent pour dénouer les tensions accumulées.',
        ],
      },
    ],
  },
  {
    slug: 'journal-gratitude-quotidien',
    title: 'Tenir un journal de gratitude au quotidien',
    date: '2024-04-28',
    category: 'Mental',
    categorySlug: 'mental',
    summary: 'Comment cultiver une perspective positive en notant trois moments de gratitude chaque soir.',
    published: true,
    image: images.blog.journal,
    imageAlt: 'Journal ouvert avec stylo et café sur un bureau en bois',
    readingTime: 7,
    author: {
      name: 'Équipe Ellea',
      role: 'Rédaction',
      image: images.authors.equipeEllea,
    },
    sections: [
      {
        paragraphs: [
          'Écrire régulièrement ce pour quoi nous sommes reconnaissantes aide à recadrer notre attention vers le positif, même dans les périodes difficiles.',
        ],
      },
    ],
  },
  {
    slug: 'legumes-printemps-recettes',
    title: 'Légumes de printemps : nos recettes préférées',
    date: '2024-04-25',
    category: 'Nutrition',
    categorySlug: 'nutrition',
    summary: 'Asperges, petits pois et radis : des idées de plats colorés et vitaminés pour la saison.',
    published: true,
    image: images.blog.legumes,
    imageAlt: 'Panier de légumes frais de printemps',
    readingTime: 10,
    author: {
      name: 'Équipe Ellea',
      role: 'Rédaction',
      image: images.authors.equipeEllea,
    },
    sections: [
      {
        paragraphs: [
          'Le printemps offre une abondance de légumes tendres et nutritifs. Profitez-en pour varier vos assiettes et soutenir votre détox naturelle.',
        ],
      },
    ],
  },
  {
    slug: 'routine-soin-peau-naturelle',
    title: 'Routine soin de la peau au naturel',
    date: '2024-04-20',
    category: 'Corps',
    categorySlug: 'corps',
    summary: 'Une routine minimaliste avec des ingrédients simples pour une peau éclatante.',
    published: true,
    image: images.blog.soinPeau,
    imageAlt: 'Produits de soin naturels sur une étagère de salle de bain',
    readingTime: 6,
    author: {
      name: 'Équipe Ellea',
      role: 'Rédaction',
      image: images.authors.equipeEllea,
    },
    sections: [
      {
        paragraphs: [
          'Moins c’est souvent plus en matière de soins. Nettoyage doux, hydratation et protection solaire constituent les piliers d’une peau saine.',
        ],
      },
    ],
  },
  {
    slug: 'marche-meditative-pleine-conscience',
    title: 'La marche méditative en pleine conscience',
    date: '2024-04-15',
    category: 'Bien-être',
    categorySlug: 'bien-etre',
    summary: 'Marcher en étant pleinement présente : une pratique accessible et profondément régénérante.',
    published: true,
    image: images.blog.marche,
    imageAlt: 'Silhouette marchant sur une plage au coucher du soleil',
    readingTime: 8,
    author: {
      name: 'Équipe Ellea',
      role: 'Rédaction',
      image: images.authors.equipeEllea,
    },
    sections: [
      {
        paragraphs: [
          'La marche méditative combine mouvement et attention. Chaque pas devient une ancre dans le moment présent.',
        ],
      },
    ],
  },
  {
    slug: 'sommeil-reparateur-conseils',
    title: 'Sommeil réparateur : nos conseils essentiels',
    date: '2024-04-10',
    category: 'Sommeil',
    categorySlug: 'bien-etre',
    summary: 'Hygiène du sommeil, rituels du soir et environnement propice au repos profond.',
    published: true,
    image: images.blog.sommeil,
    imageAlt: 'Table de chevet avec lampe douce et livres',
    readingTime: 6,
    author: {
      name: 'Équipe Ellea',
      role: 'Rédaction',
      image: images.authors.equipeEllea,
    },
    sections: [
      {
        paragraphs: [
          'Un sommeil de qualité est fondamental pour l’équilibre hormonal. Réduire les écrans et créer une routine apaisante fait toute la différence.',
        ],
      },
    ],
  },
  {
    slug: 'smoothie-energie-matin',
    title: 'Smoothie énergie du matin',
    date: '2024-04-05',
    category: 'Nutrition',
    categorySlug: 'nutrition',
    summary: 'Un smoothie vert riche en vitamines pour démarrer la journée avec vitalité.',
    published: true,
    image: images.blog.smoothie,
    imageAlt: 'Smoothie vert dans un bol avec garnitures fraîches',
    readingTime: 9,
    author: {
      name: 'Équipe Ellea',
      role: 'Rédaction',
      image: images.authors.equipeEllea,
    },
    sections: [
      {
        paragraphs: [
          'Épinards, banane, graines de chia et lait végétal : la combinaison parfaite pour un petit-déjeuner rapide et nourrissant.',
        ],
      },
    ],
  },
  {
    slug: 'meditation-debutante-guide',
    title: 'Méditation pour débutantes : par où commencer ?',
    date: '2024-04-01',
    category: 'Méditation',
    categorySlug: 'mental',
    summary: 'Un guide bienveillant pour intégrer la méditation dans votre quotidien, sans pression.',
    published: true,
    image: images.blog.meditation,
    imageAlt: 'Femme en position de méditation les yeux fermés',
    readingTime: 5,
    author: {
      name: 'Équipe Ellea',
      role: 'Rédaction',
      image: images.authors.equipeEllea,
    },
    sections: [
      {
        paragraphs: [
          'La méditation n’exige ni matériel ni compétence particulière. Commencez par cinq minutes d’attention portée sur votre respiration.',
        ],
      },
    ],
  },
];

export const POSTS_PER_PAGE = 9;

export function getPostHref(post: Pick<Post, 'slug' | 'published'>): string {
  return post.published ? `/blog/${post.slug}/` : '#';
}

export function getPostBySlug(slug: string): Post | undefined {
  const post = posts.find((item) => item.slug === slug);
  if (!post?.published || post.sections.length === 0) return undefined;
  return post;
}

export function getPublishedPosts(): Post[] {
  return posts
    .filter((item) => item.published && item.sections.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostsBySlugs(slugs: string[]): Post[] {
  return slugs.map((slug) => getPostBySlug(slug)).filter((p): p is Post => Boolean(p));
}

export function getRecentPostsExcluding(excludeSlugs: string[], limit = 9): Post[] {
  const exclude = new Set(excludeSlugs);
  return getPublishedPosts().filter((p) => !exclude.has(p.slug)).slice(0, limit);
}

export function getRelatedPosts(post: Post): Post[] {
  if (!post.relatedSlugs?.length) return getPublishedPosts().filter((p) => p.slug !== post.slug).slice(0, 3);
  return post.relatedSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is Post => Boolean(p));
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function formatPostDateShort(date: string): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}
