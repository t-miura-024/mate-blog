import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type PrevNextArticle = {
  title: string;
  href: string;
};

export type PrevNextNavigationProps = {
  prev?: PrevNextArticle;
  next?: PrevNextArticle;
};

const titleClasses = 'font-heading transition-colors hover:text-accent-strong';

export function PrevNextNavigation({ prev, next }: PrevNextNavigationProps): ReactNode {
  if (prev === undefined && next === undefined) {
    return null;
  }

  return (
    <nav aria-label="前後の記事" className={cn('grid gap-4 sm:grid-cols-2')}>
      {prev !== undefined && (
        <div>
          <p className={cn('text-small text-text-subtle')}>前の記事</p>
          <a href={prev.href} className={cn(titleClasses)}>
            {prev.title}
          </a>
        </div>
      )}
      {next !== undefined && (
        <div className={cn(prev === undefined && 'sm:col-start-2', 'sm:text-right')}>
          <p className={cn('text-small text-text-subtle')}>次の記事</p>
          <a href={next.href} className={cn(titleClasses)}>
            {next.title}
          </a>
        </div>
      )}
    </nav>
  );
}
