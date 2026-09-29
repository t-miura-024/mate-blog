import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ArticleBodyProps = {
  className?: string;
  children: ReactNode;
};

export function ArticleBody({ className, children }: ArticleBodyProps): ReactNode {
  return (
    <div
      className={cn(
        'prose prose-neutral max-w-none prose-headings:scroll-mt-24 prose-headings:font-heading prose-a:text-accent-strong hover:prose-a:text-accent prose-img:rounded-lg',
        className,
      )}
    >
      {children}
    </div>
  );
}
