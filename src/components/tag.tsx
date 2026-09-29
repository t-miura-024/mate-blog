import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type TagProps = {
  href?: string;
  className?: string;
  children: ReactNode;
};

const baseClasses =
  'inline-flex items-center rounded-sm bg-accent-soft px-2.5 py-1 text-small leading-none text-accent-strong';

export function Tag({ href, className, children }: TagProps): ReactNode {
  const classes = cn(
    baseClasses,
    href !== undefined && 'transition-colors hover:bg-accent-soft/70',
    className,
  );

  if (href !== undefined) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return <span className={classes}>{children}</span>;
}
