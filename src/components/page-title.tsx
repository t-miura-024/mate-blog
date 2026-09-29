import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type PageTitleProps = {
  children: ReactNode;
  description?: string;
  className?: string;
};

export function PageTitle({ children, description, className }: PageTitleProps): ReactNode {
  return (
    <div className={cn('', className)}>
      <h1 className="font-heading text-display font-bold">{children}</h1>
      {description !== undefined ? <p className="mt-3 text-text-subtle">{description}</p> : null}
    </div>
  );
}
