import type { ReactNode } from 'react';
import { Container } from './container';

export type SiteFooterLink = {
  label: string;
  href: string;
};

export type SiteFooterProps = {
  siteName: string;
  links: SiteFooterLink[];
};

export function SiteFooter({ siteName, links }: SiteFooterProps): ReactNode {
  return (
    <footer className="mt-16 border-t border-border py-8">
      <Container className="flex flex-col items-center gap-4 text-small text-text-subtle sm:flex-row sm:justify-between">
        <nav aria-label="フッターメニュー">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition-colors hover:text-accent-strong">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p>© {siteName}</p>
      </Container>
    </footer>
  );
}
