import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import type { ArticleCardProps } from './article-card';
import { RelatedArticles } from './related-articles';

function createArticle(href: string, title: string): ArticleCardProps {
  return {
    title,
    excerpt: '抜粋です。',
    href,
    publishedAt: '2026-09-29',
    categoryName: '育児',
    categoryHref: '/categories/ikuji/',
  };
}

const articles = [
  createArticle('/articles/a/', '関連記事1'),
  createArticle('/articles/b/', '関連記事2'),
  createArticle('/articles/c/', '関連記事3'),
];

describe('RelatedArticles', () => {
  it('見出しを描画する', () => {
    render(<RelatedArticles articles={articles} />);

    expect(screen.getByRole('heading', { name: '関連記事' })).toBeInTheDocument();
  });

  it('記事の数だけカードを描画する', () => {
    render(<RelatedArticles articles={articles} />);

    expect(screen.getByRole('link', { name: '関連記事1' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '関連記事2' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '関連記事3' })).toBeInTheDocument();
  });

  it('articles が空のときは描画しない', () => {
    const { container } = render(<RelatedArticles articles={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('a11y 違反がない', async () => {
    const { container } = render(
      <>
        <h1>記事タイトル</h1>
        <RelatedArticles articles={articles} />
      </>,
    );

    await expectNoA11yViolations(container);
  });
});
