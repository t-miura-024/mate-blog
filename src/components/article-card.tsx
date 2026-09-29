import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { ArticleMeta } from './article-meta';

export type ArticleCardTag = {
  label: string;
  href: string;
};

export type ArticleCardProps = {
  title: string;
  excerpt: string;
  href: string;
  publishedAt: string;
  categoryName: string;
  categoryHref: string;
  tags?: ArticleCardTag[];
  eyecatchUrl?: string;
  eyecatchAlt?: string;
  className?: string;
};

export function ArticleCard({
  title,
  excerpt,
  href,
  publishedAt,
  categoryName,
  categoryHref,
  tags,
  eyecatchUrl,
  eyecatchAlt,
  className,
}: ArticleCardProps): ReactNode {
  return (
    <article
      className={cn(
        'relative rounded-lg border border-border bg-base p-6 transition-shadow hover:shadow-soft',
        className,
      )}
    >
      {eyecatchUrl !== undefined && (
        <img
          src={eyecatchUrl}
          alt={eyecatchAlt ?? ''}
          className="mb-4 aspect-video w-full rounded-md object-cover"
        />
      )}
      <ArticleMeta
        publishedAt={publishedAt}
        categoryName={categoryName}
        categoryHref={categoryHref}
        tags={tags}
      />
      <h3 className="mt-3 font-heading text-h3 font-bold">
        <a href={href} className="transition-colors hover:text-accent-strong">
          {title}
        </a>
      </h3>
      <p className="mt-2 line-clamp-3 text-small text-text-subtle">{excerpt}</p>
    </article>
  );
}
