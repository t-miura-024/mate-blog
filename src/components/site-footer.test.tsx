import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { SiteFooter } from './site-footer';

const props = {
  siteName: 'おなかのそと',
  links: [
    { label: '記事一覧', href: '/articles/' },
    { label: 'カテゴリー', href: '/categories/' },
    { label: 'お問い合わせ', href: '/contact/' },
  ],
};

describe('SiteFooter', () => {
  it('サイト名を含む著作表示を描画する', () => {
    render(<SiteFooter {...props} />);

    expect(screen.getByText('© おなかのそと')).toBeInTheDocument();
  });

  it('全リンクを描画する', () => {
    render(<SiteFooter {...props} />);

    for (const link of props.links) {
      expect(screen.getByRole('link', { name: link.label })).toHaveAttribute('href', link.href);
    }
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<SiteFooter {...props} />);

    await expectNoA11yViolations(container);
  });
});
