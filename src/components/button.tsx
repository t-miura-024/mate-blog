import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'text';

export type ButtonProps = {
  variant?: ButtonVariant;
  href?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  target?: string;
  rel?: string;
  className?: string;
  children: ReactNode;
};

const baseClasses = 'inline-flex items-center justify-center gap-2 font-medium transition-colors';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'rounded-md bg-accent-strong px-8 py-3 text-white hover:bg-accent-strong/85',
  text: 'text-accent-strong underline underline-offset-4 hover:text-accent',
};

export function Button({
  variant = 'primary',
  href,
  type = 'button',
  onClick,
  target,
  rel,
  className,
  children,
}: ButtonProps): ReactNode {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (href !== undefined) {
    return (
      <a href={href} target={target} rel={rel} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
