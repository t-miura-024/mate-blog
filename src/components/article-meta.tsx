import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { formatDate } from '@/lib/date';
import { Tag } from './tag';

export type ArticleMetaTag = {
  label: string;
  href: string;
};

export type ArticleMetaProps = {
  publishedAt: string;
  categoryName: string;
  categoryHref: string;
  tags?: ArticleMetaTag[];
  className?: string;
};

export function ArticleMeta({
  publishedAt,
  categoryName,
  categoryHref,
  tags,
  className,
}: ArticleMetaProps): ReactNode {
  return (
    <div
      className={cn(
        'flex flex-wrap items-center gap-x-4 gap-y-2 text-small text-text-subtle',
        className,
      )}
    >
      <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
      <a href={categoryHref} className="transition-colors hover:text-accent-strong">
        {categoryName}
      </a>
      {tags !== undefined && tags.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <li key={tag.href}>
              <Tag href={tag.href}>{tag.label}</Tag>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
