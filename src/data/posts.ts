export type PostSection = {
  heading?: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Post = {
  slug: string;
  title: string;
  /** Date de publication ISO (YYYY-MM-DD) — alimente datePublished (JSON-LD). */
  date: string;
  /** Date de dernière modification ISO (optionnel) — alimente dateModified. */
  updated?: string;
  category: string;
  summary: string;
  published: boolean;
  image?: string;
  imageAlt?: string;
  author?: {
    name: string;
    role: string;
    image: string;
  };
  sections: PostSection[];
};

export const postUi = {
  backLink: 'Retour au blog',
  listEyebrow: 'Blog',
  listTitle: 'Articles',
  listSubtitle:
    'Ajoutez vos articles dans src/data/posts.ts — chaque entrée apparaîtra automatiquement sur cette page.',
  readArticle: 'Lire l’article',
  comingSoon: 'Bientôt disponible',
} as const;

export const posts: Post[] = [];

export function getPostHref(post: Pick<Post, 'slug' | 'published'>): string {
  return post.published ? `/blog/${post.slug}/` : '#';
}

export function getPostBySlug(slug: string): Post | undefined {
  const post = posts.find((item) => item.slug === slug);
  if (!post?.published || post.sections.length === 0) return undefined;
  return post;
}

export function getPublishedPosts(): Post[] {
  return posts.filter((item) => item.published && item.sections.length > 0);
}
