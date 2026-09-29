import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { PhotoFigure } from './photo-figure';

describe('PhotoFigure', () => {
  it('src と alt を img に渡す', () => {
    render(<PhotoFigure src="/images/sample.jpg" alt="赤ちゃんの靴下の写真" />);

    const img = screen.getByRole('img', { name: '赤ちゃんの靴下の写真' });
    expect(img).toHaveAttribute('src', '/images/sample.jpg');
    expect(img).toHaveAttribute('loading', 'lazy');
  });

  it('caption があるときは figcaption を描画する', () => {
    render(<PhotoFigure src="/images/sample.jpg" alt="写真" caption="はじめての靴下" />);

    expect(screen.getByText('はじめての靴下').tagName).toBe('FIGCAPTION');
  });

  it('caption がないときは figcaption を描画しない', () => {
    const { container } = render(<PhotoFigure src="/images/sample.jpg" alt="写真" />);

    expect(container.querySelector('figcaption')).toBeNull();
  });

  it('a11y 違反がない', async () => {
    const { container } = render(
      <>
        <h1>記事タイトル</h1>
        <h2>本文</h2>
        <PhotoFigure src="/images/sample.jpg" alt="赤ちゃんの靴下の写真" caption="はじめての靴下" />
      </>,
    );

    await expectNoA11yViolations(container);
  });
});
