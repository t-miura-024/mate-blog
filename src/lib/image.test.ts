import { describe, expect, it } from 'vitest';
import { buildImageSrcSet, buildImageUrl } from './image';

const MICROCMS_URL = 'https://images.microcms-assets.io/assets/aaa/bbb/photo.png';

describe('buildImageUrl', () => {
  it('microCMS の画像 URL に幅・品質・形式のパラメータを付与する', () => {
    expect(buildImageUrl(MICROCMS_URL, { width: 720 })).toBe(`${MICROCMS_URL}?w=720&q=80&fm=webp`);
  });

  it('既存のクエリパラメータを保持する', () => {
    expect(buildImageUrl(`${MICROCMS_URL}?dpr=2`, { width: 480 })).toBe(
      `${MICROCMS_URL}?dpr=2&w=480&q=80&fm=webp`,
    );
  });

  it('品質と形式を指定できる', () => {
    expect(buildImageUrl(MICROCMS_URL, { width: 480, quality: 60, format: 'webp' })).toBe(
      `${MICROCMS_URL}?w=480&q=60&fm=webp`,
    );
  });

  it('microCMS 以外の URL は変更しない', () => {
    expect(buildImageUrl('/images/sample.jpg', { width: 480 })).toBe('/images/sample.jpg');
  });

  it('microCMS 以外の絶対 URL は変更しない', () => {
    expect(buildImageUrl('https://example.com/photo.png', { width: 480 })).toBe(
      'https://example.com/photo.png',
    );
  });

  it('URL として解釈できない値はそのまま返す', () => {
    expect(buildImageUrl('not a url', { width: 480 })).toBe('not a url');
  });
});

describe('buildImageSrcSet', () => {
  it('幅ごとの URL と w 記述子を列挙する', () => {
    expect(buildImageSrcSet(MICROCMS_URL, [480, 960])).toBe(
      `${MICROCMS_URL}?w=480&q=80&fm=webp 480w, ${MICROCMS_URL}?w=960&q=80&fm=webp 960w`,
    );
  });

  it('幅の指定が空なら空文字を返す', () => {
    expect(buildImageSrcSet(MICROCMS_URL, [])).toBe('');
  });

  it('microCMS 以外の URL では空文字を返す', () => {
    expect(buildImageSrcSet('/images/sample.jpg', [480, 960])).toBe('');
    expect(buildImageSrcSet('https://example.com/photo.png', [480, 960])).toBe('');
  });
});
