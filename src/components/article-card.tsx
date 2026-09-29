import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { buildImageSrcSet } from '@/lib/image';
import { ArticleMeta } from './article-meta';

const EYECATCH_WIDTHS = [320, 480, 640, 960];
const EYECATCH_SIZES = '(min-width: 1080px) 344px, (min-width: 640px) 50vw, 100vw';

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
          srcSet={buildImageSrcSet(eyecatchUrl, EYECATCH_WIDTHS)}
          sizes={EYECATCH_SIZES}
          alt={eyecatchAlt ?? ''}
          loading="lazy"
          decoding="async"
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
