import { describe, expect, it } from 'vitest';
import {
  buildArticleStructuredData,
  serializeStructuredData,
  type ArticleStructuredData,
} from './structured-data';

describe('buildArticleStructuredData', () => {
  it('更新日と画像ありのときはdateModifiedとimageを含む', () => {
    expect(
      buildArticleStructuredData({
        title: '記事タイトル',
        description: '記事の説明文',
        url: 'https://example.com/articles/1/',
        publishedAt: '2026-01-01T00:00:00+09:00',
        updatedAt: '2026-01-02T00:00:00+09:00',
        imageUrl: 'https://example.com/images/1.jpg',
        authorName: '筆者名',
        siteName: 'おなかのそと',
      }),
    ).toEqual({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: '記事タイトル',
      description: '記事の説明文',
      datePublished: '2026-01-01T00:00:00+09:00',
      dateModified: '2026-01-02T00:00:00+09:00',
      image: 'https://example.com/images/1.jpg',
      mainEntityOfPage: 'https://example.com/articles/1/',
      author: { '@type': 'Person', name: '筆者名' },
      publisher: { '@type': 'Organization', name: 'おなかのそと' },
    });
  });

  it('更新日と画像なしのときはdateModifiedとimageを含めない', () => {
    const result = buildArticleStructuredData({
      title: '記事タイトル',
      description: '記事の説明文',
      url: 'https://example.com/articles/1/',
      publishedAt: '2026-01-01T00:00:00+09:00',
      authorName: '筆者名',
      siteName: 'おなかのそと',
    });
    expect(result).not.toHaveProperty('dateModified');
    expect(result).not.toHaveProperty('image');
    expect(result.datePublished).toBe('2026-01-01T00:00:00+09:00');
  });

  it('更新日のみのときはdateModifiedだけを含める', () => {
    const result = buildArticleStructuredData({
      title: '記事タイトル',
      description: '記事の説明文',
      url: 'https://example.com/articles/1/',
      publishedAt: '2026-01-01T00:00:00+09:00',
      updatedAt: '2026-01-02T00:00:00+09:00',
      authorName: '筆者名',
      siteName: 'おなかのそと',
    });
    expect(result.dateModified).toBe('2026-01-02T00:00:00+09:00');
    expect(result).not.toHaveProperty('image');
  });

  it('画像のみのときはimageだけを含める', () => {
    const result = buildArticleStructuredData({
      title: '記事タイトル',
      description: '記事の説明文',
      url: 'https://example.com/articles/1/',
      publishedAt: '2026-01-01T00:00:00+09:00',
      imageUrl: 'https://example.com/images/1.jpg',
      authorName: '筆者名',
      siteName: 'おなかのそと',
    });
    expect(result.image).toBe('https://example.com/images/1.jpg');
    expect(result).not.toHaveProperty('dateModified');
  });
});

describe('serializeStructuredData', () => {
  it('<を含まないデータはJSON.stringifyと同じ文字列になる', () => {
    const structuredData: ArticleStructuredData = buildArticleStructuredData({
      title: '記事タイトル',
      description: '記事の説明文',
      url: 'https://example.com/articles/1/',
      publishedAt: '2026-01-01T00:00:00+09:00',
      authorName: '筆者名',
      siteName: 'おなかのそと',
    });
    expect(serializeStructuredData(structuredData)).toBe(JSON.stringify(structuredData));
  });

  it('<を\\u003cにエスケープしJSONとして復元できる', () => {
    const structuredData: ArticleStructuredData = buildArticleStructuredData({
      title: '</script><script>alert(1)</script>',
      description: 'a<b',
      url: 'https://example.com/articles/1/',
      publishedAt: '2026-01-01T00:00:00+09:00',
      authorName: '筆者名',
      siteName: 'おなかのそと',
    });
    const serialized = serializeStructuredData(structuredData);
    expect(serialized).not.toContain('<');
    expect(serialized).toContain('\\u003c');
    expect(JSON.parse(serialized)).toEqual(JSON.parse(JSON.stringify(structuredData)));
  });

  it('U+2028とU+2029をエスケープしJSONとして復元できる', () => {
    const structuredData: ArticleStructuredData = buildArticleStructuredData({
      title: 'あ\u2028い\u2029う',
      description: '記事の説明文',
      url: 'https://example.com/articles/1/',
      publishedAt: '2026-01-01T00:00:00+09:00',
      authorName: '筆者名',
      siteName: 'おなかのそと',
    });
    const serialized = serializeStructuredData(structuredData);
    expect(serialized).not.toContain('\u2028');
    expect(serialized).not.toContain('\u2029');
    expect(serialized).toContain('\\u2028');
    expect(serialized).toContain('\\u2029');
    expect(JSON.parse(serialized)).toEqual(JSON.parse(JSON.stringify(structuredData)));
  });
});
