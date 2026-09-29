import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { buildImageSrcSet } from '@/lib/image';

export type PhotoFigureAspect = 'auto' | 'video';

export type PhotoFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  aspect?: PhotoFigureAspect;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  srcSet?: string;
  sizes?: string;
  className?: string;
};

const DEFAULT_WIDTHS = [480, 720, 1080, 1440];
const DEFAULT_SIZES = '(min-width: 768px) 720px, 100vw';

export function PhotoFigure({
  src,
  alt,
  caption,
  width,
  height,
  aspect = 'auto',
  loading = 'lazy',
  fetchPriority,
  srcSet,
  sizes = DEFAULT_SIZES,
  className,
}: PhotoFigureProps): ReactNode {
  const resolvedSrcSet = srcSet ?? buildImageSrcSet(src, DEFAULT_WIDTHS);

  return (
    <figure className={cn('', className)}>
      <img
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        fetchPriority={fetchPriority}
        className={cn('w-full rounded-lg', aspect === 'video' && 'aspect-video object-cover')}
        {...(resolvedSrcSet !== '' ? { srcSet: resolvedSrcSet, sizes } : {})}
        {...(width !== undefined ? { width } : {})}
        {...(height !== undefined ? { height } : {})}
      />
      {caption !== undefined && (
        <figcaption className="mt-2 text-small text-text-subtle">{caption}</figcaption>
      )}
    </figure>
  );
}
