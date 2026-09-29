import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { ArticleMeta } from './article-meta';

describe('ArticleMeta', () => {
  it('日付テキストとdateTime属性を描画する', () => {
    render(
      <ArticleMeta
        publishedAt="2026-09-29"
        categoryName="育児"
        categoryHref="/categories/ikuji/"
      />,
    );

    const time = screen.getByText('2026年9月29日');
    expect(time.tagName).toBe('TIME');
    expect(time).toHaveAttribute('dateTime', '2026-09-29');
  });

  it('カテゴリリンクを描画する', () => {
    render(
      <ArticleMeta
        publishedAt="2026-09-29"
        categoryName="育児"
        categoryHref="/categories/ikuji/"
      />,
    );

    expect(screen.getByRole('link', { name: '育児' })).toHaveAttribute(
      'href',
      '/categories/ikuji/',
    );
  });

  it('タグを描画する', () => {
    render(
      <ArticleMeta
        publishedAt="2026-09-29"
        categoryName="育児"
        categoryHref="/categories/ikuji/"
        tags={[
          { label: '離乳食', href: '/tags/rinyushoku/' },
          { label: '夜泣き', href: '/tags/yonaki/' },
        ]}
      />,
    );

    expect(screen.getByRole('link', { name: '離乳食' })).toHaveAttribute(
      'href',
      '/tags/rinyushoku/',
    );
    expect(screen.getByRole('link', { name: '夜泣き' })).toHaveAttribute('href', '/tags/yonaki/');
  });

  it('tagsがないときはタグ一覧を描画しない', () => {
    const { container } = render(
      <ArticleMeta
        publishedAt="2026-09-29"
        categoryName="育児"
        categoryHref="/categories/ikuji/"
      />,
    );

    expect(container.querySelector('ul')).toBeNull();
  });

  it('a11y 違反がない', async () => {
    const { container } = render(
      <ArticleMeta
        publishedAt="2026-09-29"
        categoryName="育児"
        categoryHref="/categories/ikuji/"
        tags={[{ label: '離乳食', href: '/tags/rinyushoku/' }]}
      />,
    );

    await expectNoA11yViolations(container);
  });
});
