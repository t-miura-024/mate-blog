import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type NoticeTone = 'default' | 'accent';

export type NoticeProps = {
  tone?: NoticeTone;
  className?: string;
  children: ReactNode;
};

const toneClasses: Record<NoticeTone, string> = {
  default: 'border-border bg-surface',
  accent: 'border-accent bg-accent-soft',
};

export function Notice({ tone = 'default', className, children }: NoticeProps): ReactNode {
  return (
    <div
      role="note"
      className={cn('rounded-md border px-4 py-3 text-small', toneClasses[tone], className)}
    >
      {children}
    </div>
  );
}
