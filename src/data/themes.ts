import { images } from '@/data/images';

export type ThemeIcon = keyof typeof images.icons;

export type Theme = {
  slug: string;
  label: string;
  icon: ThemeIcon;
  /** Slug de catégorie d'article associé (filtre blog). */
  categorySlug?: string;
};

export const themes: Theme[] = [
  { slug: 'cycle-menstruel', label: 'Cycle menstruel', icon: 'moon', categorySlug: 'corps' },
  { slug: 'fertilite', label: 'Fertilité', icon: 'sun', categorySlug: 'bien-etre' },
  { slug: 'sante-mentale', label: 'Santé mentale', icon: 'heart', categorySlug: 'mental' },
  { slug: 'nutrition', label: 'Nutrition', icon: 'leaf', categorySlug: 'nutrition' },
  { slug: 'sport', label: 'Sport', icon: 'zap', categorySlug: 'corps' },
  { slug: 'maternite', label: 'Maternité', icon: 'smile', categorySlug: 'bien-etre' },
];

export const blogFilterThemes: Theme[] = [
  { slug: 'bien-etre', label: 'Bien-être', icon: 'heart', categorySlug: 'bien-etre' },
  { slug: 'corps', label: 'Corps', icon: 'zap', categorySlug: 'corps' },
  { slug: 'mental', label: 'Mental', icon: 'heart', categorySlug: 'mental' },
  { slug: 'nutrition', label: 'Nutrition', icon: 'leaf', categorySlug: 'nutrition' },
  { slug: 'fertilite', label: 'Fertilité', icon: 'sun', categorySlug: 'bien-etre' },
  { slug: 'maternite', label: 'Maternité', icon: 'smile', categorySlug: 'bien-etre' },
];

export function getThemeBySlug(slug: string): Theme | undefined {
  return themes.find((t) => t.slug === slug) ?? blogFilterThemes.find((t) => t.slug === slug);
}
