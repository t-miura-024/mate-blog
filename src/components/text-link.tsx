import type { ReactNode } from 'react';
import { ExternalLink } from 'lucide-react';
import { cn } from '@/lib/cn';

export type TextLinkProps = {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
};

const baseClasses =
  'text-accent-strong underline underline-offset-4 transition-colors hover:text-accent';

export function TextLink({
  href,
  external = false,
  className,
  children,
}: TextLinkProps): ReactNode {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(baseClasses, className)}
      >
        {children}
        <ExternalLink size={14} aria-hidden="true" className="inline-block align-[-0.125em]" />
      </a>
    );
  }

  return (
    <a href={href} className={cn(baseClasses, className)}>
      {children}
    </a>
  );
}
