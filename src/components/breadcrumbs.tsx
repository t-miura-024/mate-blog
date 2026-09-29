import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

const linkClasses = 'text-text-subtle transition-colors hover:text-accent-strong';

export function Breadcrumbs({ items }: BreadcrumbsProps): ReactNode {
  return (
    <nav aria-label="パンくずリスト">
      <ol className={cn('flex flex-wrap items-center gap-x-2 gap-y-1 text-small')}>
        {items.map((item, index) => (
          <li key={item.label} className={cn('flex items-center gap-2')}>
            {index > 0 && (
              <ChevronRight size={14} aria-hidden="true" className={cn('text-border')} />
            )}
            {item.href !== undefined ? (
              <a href={item.href} className={cn(linkClasses)}>
                {item.label}
              </a>
            ) : (
              <span aria-current="page" className={cn('text-text')}>
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
