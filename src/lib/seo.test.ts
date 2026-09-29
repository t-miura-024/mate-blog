import { describe, expect, it } from 'vitest';
import { buildSeoMeta } from './seo';

describe('buildSeoMeta', () => {
  it('画像ありのときはog:imageとsummary_large_imageを含む全7件を順序どおり返す', () => {
    expect(
      buildSeoMeta({
        title: '記事タイトル｜おなかのそと',
        description: '記事の説明文',
        url: 'https://example.com/articles/1/',
        siteName: 'おなかのそと',
        type: 'article',
        imageUrl: 'https://example.com/images/1.jpg',
      }),
    ).toEqual([
      { property: 'og:title', content: '記事タイトル｜おなかのそと' },
      { property: 'og:description', content: '記事の説明文' },
      { property: 'og:type', content: 'article' },
      { property: 'og:url', content: 'https://example.com/articles/1/' },
      { property: 'og:site_name', content: 'おなかのそと' },
      { property: 'og:image', content: 'https://example.com/images/1.jpg' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ]);
  });

  it('画像なしのときはog:imageを省きtwitter:cardはsummaryになる', () => {
    expect(
      buildSeoMeta({
        title: 'トップ｜おなかのそと',
        description: 'サイトの説明文',
        url: 'https://example.com/',
        siteName: 'おなかのそと',
        type: 'website',
      }),
    ).toEqual([
      { property: 'og:title', content: 'トップ｜おなかのそと' },
      { property: 'og:description', content: 'サイトの説明文' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://example.com/' },
      { property: 'og:site_name', content: 'おなかのそと' },
      { name: 'twitter:card', content: 'summary' },
    ]);
  });
});
