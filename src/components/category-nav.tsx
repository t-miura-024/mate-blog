import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type CategoryNavProps = {
  categories: { name: string; href: string }[];
  currentHref?: string;
  className?: string;
};

export function CategoryNav({ categories, currentHref, className }: CategoryNavProps): ReactNode {
  return (
    <nav aria-label="カテゴリ" className={cn('', className)}>
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {categories.map((category) => (
          <li key={category.href}>
            <a
              href={category.href}
              aria-current={category.href === currentHref ? 'page' : undefined}
              className={cn(
                'transition-colors hover:text-accent-strong',
                category.href === currentHref && 'font-medium text-accent-strong',
              )}
            >
              {category.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
