export type CategorySlug = 'pregnancy' | 'birth' | 'childcare';

export type Category = {
  slug: CategorySlug;
  name: string;
};

export const CATEGORIES: Category[] = [
  { slug: 'pregnancy', name: '妊娠期' },
  { slug: 'birth', name: '出産' },
  { slug: 'childcare', name: '育児期' },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug);
}

export function categoryHref(category: Category): string {
  return `/categories/${category.slug}/`;
}
