import type { TocItem } from './article-body';
import { categoryHref, getCategoryBySlug, type CategorySlug } from './categories';

export type Article = {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  categorySlug: CategorySlug;
  tags: string[];
  showMedicalNotice: boolean;
  eyecatchUrl?: string;
  eyecatchAlt?: string;
  html: string;
  tocItems: TocItem[];
};

export type ArticleCardData = {
  title: string;
  excerpt: string;
  href: string;
  publishedAt: string;
  categoryName: string;
  categoryHref: string;
  tags: { label: string; href: string }[];
  eyecatchUrl?: string;
  eyecatchAlt?: string;
};

export function articleHref(article: Article): string {
  return `/articles/${article.id}/`;
}

export function tagHref(tag: string): string {
  return `/tags/${tag}/`;
}

export function toTagLinks(tags: string[]): { label: string; href: string }[] {
  return tags.map((tag) => ({ label: tag, href: tagHref(tag) }));
}

export function sortArticlesByPublishedAtDesc(articles: Article[]): Article[] {
  return articles.toSorted((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getLatestArticles(articles: Article[], limit: number): Article[] {
  return sortArticlesByPublishedAtDesc(articles).slice(0, limit);
}

export function getArticleById(articles: Article[], id: string): Article | undefined {
  return articles.find((article) => article.id === id);
}

export function getArticlesByCategorySlug(articles: Article[], slug: string): Article[] {
  return sortArticlesByPublishedAtDesc(articles.filter((article) => article.categorySlug === slug));
}

export function getArticlesByTag(articles: Article[], tag: string): Article[] {
  return sortArticlesByPublishedAtDesc(articles.filter((article) => article.tags.includes(tag)));
}

export function collectTags(articles: Article[]): { label: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const article of articles) {
    for (const tag of article.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([label, count]) => ({ label, count }))
    .toSorted((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'ja'));
}

export function selectRelatedArticles(articles: Article[], current: Article, limit = 3): Article[] {
  return getArticlesByCategorySlug(articles, current.categorySlug)
    .filter((article) => article.id !== current.id)
    .slice(0, limit);
}

export function selectAdjacentArticles(
  articles: Article[],
  current: Article,
): { prev?: Article; next?: Article } {
  const sorted = sortArticlesByPublishedAtDesc(articles);
  const index = sorted.findIndex((article) => article.id === current.id);
  if (index === -1) {
    return {};
  }
  return { prev: sorted[index + 1], next: sorted[index - 1] };
}

export function toArticleCardData(article: Article): ArticleCardData {
  const category = getCategoryBySlug(article.categorySlug);
  if (category === undefined) {
    throw new Error(`unknown category: ${article.categorySlug}`);
  }
  return {
    title: article.title,
    excerpt: article.excerpt,
    href: articleHref(article),
    publishedAt: article.publishedAt,
    categoryName: category.name,
    categoryHref: categoryHref(category),
    tags: toTagLinks(article.tags),
    eyecatchUrl: article.eyecatchUrl,
    eyecatchAlt: article.eyecatchAlt,
  };
}
