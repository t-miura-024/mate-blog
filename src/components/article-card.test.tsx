import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { ArticleCard } from './article-card';

const baseProps = {
  title: '夜泣きとの向き合い方',
  excerpt: '夜泣きが続くときの工夫をまとめました。',
  href: '/articles/yonaki/',
  publishedAt: '2026-09-29',
  categoryName: '育児',
  categoryHref: '/categories/ikuji/',
};

describe('ArticleCard', () => {
  it('タイトルをリンクとして href とともに描画する', () => {
    render(<ArticleCard {...baseProps} />);

    expect(screen.getByRole('link', { name: '夜泣きとの向き合い方' })).toHaveAttribute(
      'href',
      '/articles/yonaki/',
    );
  });

  it('抜粋を描画する', () => {
    render(<ArticleCard {...baseProps} />);

    expect(screen.getByText('夜泣きが続くときの工夫をまとめました。')).toBeInTheDocument();
  });

  it('eyecatchUrl があるときは画像を alt とともに描画する', () => {
    render(
      <ArticleCard {...baseProps} eyecatchUrl="/images/eyecatch.jpg" eyecatchAlt="星空の写真" />,
    );

    expect(screen.getByRole('img', { name: '星空の写真' })).toHaveAttribute(
      'src',
      '/images/eyecatch.jpg',
    );
  });

  it('eyecatchUrl がないときは画像を描画しない', () => {
    const { container } = render(<ArticleCard {...baseProps} />);

    expect(container.querySelector('img')).toBeNull();
  });

  it('日付・カテゴリ・タグを描画する', () => {
    render(<ArticleCard {...baseProps} tags={[{ label: '夜泣き', href: '/tags/yonaki/' }]} />);

    expect(screen.getByText('2026年9月29日')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '育児' })).toHaveAttribute(
      'href',
      '/categories/ikuji/',
    );
    expect(screen.getByRole('link', { name: '夜泣き' })).toHaveAttribute('href', '/tags/yonaki/');
  });

  it('a11y 違反がない', async () => {
    const { container } = render(
      <>
        <h1>記事一覧</h1>
        <h2>最新の記事</h2>
        <ArticleCard
          {...baseProps}
          eyecatchUrl="/images/eyecatch.jpg"
          eyecatchAlt="星空の写真"
          tags={[{ label: '夜泣き', href: '/tags/yonaki/' }]}
        />
      </>,
    );

    await expectNoA11yViolations(container);
  });
});
