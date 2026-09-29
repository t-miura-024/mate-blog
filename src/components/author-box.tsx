import type { ReactNode } from 'react';
import { Sprout } from 'lucide-react';
import { cn } from '@/lib/cn';

export type AuthorBoxProps = {
  name: string;
  description: string;
  className?: string;
};

export function AuthorBox({ name, description, className }: AuthorBoxProps): ReactNode {
  return (
    <aside className={cn('rounded-lg border border-border bg-surface p-6', className)}>
      <h2 className="font-heading text-h3 font-bold">この記事を書いた人</h2>
      <div className="mt-4 flex items-center gap-4">
        <span
          aria-hidden="true"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent-strong"
        >
          <Sprout size={24} />
        </span>
        <div>
          <p className="font-heading font-bold">{name}</p>
          <p className="mt-1 text-small text-text-subtle">{description}</p>
        </div>
      </div>
    </aside>
  );
}
