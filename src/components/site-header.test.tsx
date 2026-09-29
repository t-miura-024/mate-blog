import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { SiteHeader } from './site-header';

const props = {
  siteName: 'おなかのそと',
  tagline: '妊娠・出産・育児を静かに読む',
  links: [
    { label: '記事一覧', href: '/articles/' },
    { label: 'カテゴリー', href: '/categories/' },
    { label: 'タグ一覧', href: '/tags/' },
    { label: 'お問い合わせ', href: '/contact/' },
  ],
};

describe('SiteHeader', () => {
  it('サイト名がトップへのリンクになっている', () => {
    render(<SiteHeader {...props} />);

    const brandLink = screen.getByRole('link', { name: /おなかのそと/ });
    expect(brandLink).toHaveAttribute('href', '/');
    expect(brandLink).toHaveTextContent('おなかのそと');
    expect(brandLink).toHaveTextContent('妊娠・出産・育児を静かに読む');
  });

  it('全リンクを描画する', () => {
    render(<SiteHeader {...props} />);

    for (const link of props.links) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<SiteHeader {...props} />);

    await expectNoA11yViolations(container);
  });
});
