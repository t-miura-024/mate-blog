import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type TocProps = {
  items: TocItem[];
  className?: string;
};

export function Toc({ items, className }: TocProps): ReactNode {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav
      aria-label="目次"
      className={cn('rounded-md border border-border bg-surface p-6', className)}
    >
      <p className="font-heading text-h3 font-bold">目次</p>
      <ol className="mt-4 space-y-2 text-small">
        {items.map((item) => (
          <li key={item.id} className={cn(item.level === 3 && 'pl-4')}>
            <a href={`#${item.id}`} className="transition-colors hover:text-accent-strong">
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
