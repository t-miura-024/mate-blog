import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type EmptyStateProps = {
  title: string;
  description?: string;
  className?: string;
  children?: ReactNode;
};

export function EmptyState({
  title,
  description,
  className,
  children,
}: EmptyStateProps): ReactNode {
  return (
    <div className={cn('py-16 text-center', className)}>
      <p className="font-heading text-h3 font-bold">{title}</p>
      {description !== undefined ? (
        <p className="mt-2 text-small text-text-subtle">{description}</p>
      ) : null}
      {children !== undefined ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
