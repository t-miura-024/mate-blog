import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type PhotoFigureProps = {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  className?: string;
};

export function PhotoFigure({
  src,
  alt,
  caption,
  width,
  height,
  className,
}: PhotoFigureProps): ReactNode {
  return (
    <figure className={cn('', className)}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="w-full rounded-lg"
        {...(width !== undefined ? { width } : {})}
        {...(height !== undefined ? { height } : {})}
      />
      {caption !== undefined && (
        <figcaption className="mt-2 text-small text-text-subtle">{caption}</figcaption>
      )}
    </figure>
  );
}
