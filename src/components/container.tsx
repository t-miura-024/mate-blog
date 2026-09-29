import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ContainerSize = 'default' | 'narrow';

export type ContainerProps = {
  size?: ContainerSize;
  className?: string;
  children: ReactNode;
};

const sizeClasses: Record<ContainerSize, string> = {
  default: 'max-w-site',
  narrow: 'max-w-content',
};

export function Container({ size = 'default', className, children }: ContainerProps): ReactNode {
  return (
    <div className={cn('mx-auto w-full px-4 sm:px-6', sizeClasses[size], className)}>
      {children}
    </div>
  );
}
