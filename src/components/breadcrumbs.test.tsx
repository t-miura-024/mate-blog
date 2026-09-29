import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { Breadcrumbs } from './breadcrumbs';

const items = [
  { label: 'トップ', href: '/' },
  { label: '記事一覧', href: '/articles/' },
  { label: '夜泣きとの向き合い方' },
];

describe('Breadcrumbs', () => {
  it('全ての項目を描画する', () => {
    render(<Breadcrumbs items={items} />);

    expect(screen.getByText('トップ')).toBeInTheDocument();
    expect(screen.getByText('記事一覧')).toBeInTheDocument();
    expect(screen.getByText('夜泣きとの向き合い方')).toBeInTheDocument();
  });

  it('最終項目は現在地として示しリンクにしない', () => {
    render(<Breadcrumbs items={items} />);

    const current = screen.getByText('夜泣きとの向き合い方');
    expect(current.tagName).toBe('SPAN');
    expect(current).toHaveAttribute('aria-current', 'page');
    expect(screen.queryByRole('link', { name: '夜泣きとの向き合い方' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'トップ' })).toHaveAttribute('href', '/');
  });

  it('項目間の区切りアイコンを支援技術から隠す', () => {
    const { container } = render(<Breadcrumbs items={items} />);

    expect(container.querySelectorAll('svg[aria-hidden="true"]')).toHaveLength(2);
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<Breadcrumbs items={items} />);

    await expectNoA11yViolations(container);
  });
});
