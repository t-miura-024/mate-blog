import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { ArticleBody } from './article-body';

describe('ArticleBody', () => {
  it('本文を prose スタイルのコンテナに描画する', () => {
    render(
      <ArticleBody>
        <h2>見出し</h2>
        <p>本文です。</p>
      </ArticleBody>,
    );

    expect(screen.getByRole('heading', { level: 2, name: '見出し' })).toBeInTheDocument();
    expect(screen.getByText('本文です。').closest('div')?.className).toContain('prose');
  });

  it('a11y 違反がない', async () => {
    const { container } = render(
      <ArticleBody>
        <h1>記事タイトル</h1>
        <h2>見出し</h2>
        <p>本文です。</p>
      </ArticleBody>,
    );

    await expectNoA11yViolations(container);
  });
});
