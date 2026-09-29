import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { AuthorBox } from './author-box';

describe('AuthorBox', () => {
  it('見出しを描画する', () => {
    render(<AuthorBox name="そらまめ" description="二児の母です。" />);

    expect(screen.getByRole('heading', { name: 'この記事を書いた人' })).toBeInTheDocument();
  });

  it('名前を描画する', () => {
    render(<AuthorBox name="そらまめ" description="二児の母です。" />);

    expect(screen.getByText('そらまめ')).toBeInTheDocument();
  });

  it('紹介文を描画する', () => {
    render(<AuthorBox name="そらまめ" description="二児の母です。" />);

    expect(screen.getByText('二児の母です。')).toBeInTheDocument();
  });

  it('画像を使わない', () => {
    const { container } = render(<AuthorBox name="そらまめ" description="二児の母です。" />);

    expect(container.querySelector('img')).toBeNull();
  });

  it('a11y 違反がない', async () => {
    const { container } = render(
      <>
        <h1>記事タイトル</h1>
        <AuthorBox name="そらまめ" description="二児の母です。" />
      </>,
    );

    await expectNoA11yViolations(container);
  });
});
