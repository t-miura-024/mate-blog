import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ArticleCard, type ArticleCardProps } from './article-card';

export type RelatedArticlesProps = {
  articles: ArticleCardProps[];
  className?: string;
};

export function RelatedArticles({ articles, className }: RelatedArticlesProps): ReactNode {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="related-articles-heading" className={cn('mt-12', className)}>
      <h2 id="related-articles-heading" className="font-heading text-h2 font-bold">
        関連記事
      </h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.href} {...article} />
        ))}
      </div>
    </section>
  );
}
