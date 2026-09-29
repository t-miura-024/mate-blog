import type { ReactNode } from 'react';
import { Container } from './container';

export type SiteHeaderLink = {
  label: string;
  href: string;
};

export type SiteHeaderProps = {
  siteName: string;
  tagline: string;
  links: SiteHeaderLink[];
};

export function SiteHeader({ siteName, tagline, links }: SiteHeaderProps): ReactNode {
  return (
    <header className="border-b border-border bg-base">
      <Container className="flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
        <a href="/" className="flex flex-wrap items-baseline gap-x-3">
          <span className="font-heading text-h2 font-bold">{siteName}</span>
          <span className="text-small text-text-subtle">{tagline}</span>
        </a>
        <nav aria-label="サイト内メニュー">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-small transition-colors hover:text-accent-strong"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
