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

  it('microCMS の画像 URL では srcset と sizes を生成する', () => {
    render(
      <PhotoFigure
        src="https://images.microcms-assets.io/assets/aaa/bbb/photo.png"
        alt="赤ちゃんの靴下の写真"
      />,
    );

    const img = screen.getByRole('img', { name: '赤ちゃんの靴下の写真' });
    expect(img.getAttribute('srcset')).toContain('w=480&q=80&fm=webp 480w');
    expect(img).toHaveAttribute('sizes', '(min-width: 768px) 720px, 100vw');
  });

  it('microCMS 以外の画像 URL では srcset を付けない', () => {
    render(<PhotoFigure src="/images/sample.jpg" alt="写真" />);

    expect(screen.getByRole('img', { name: '写真' })).not.toHaveAttribute('srcset');
  });

  it('aspect="video" では 16:9 のトリミングになる', () => {
    render(<PhotoFigure src="/images/sample.jpg" alt="写真" aspect="video" />);

    expect(screen.getByRole('img', { name: '写真' }).className).toContain('aspect-video');
  });

  it('loading と fetchPriority を指定できる', () => {
    render(
      <PhotoFigure src="/images/sample.jpg" alt="写真" loading="eager" fetchPriority="high" />,
    );

    const img = screen.getByRole('img', { name: '写真' });
    expect(img).toHaveAttribute('loading', 'eager');
    expect(img).toHaveAttribute('fetchpriority', 'high');
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
