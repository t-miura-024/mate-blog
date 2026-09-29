import { describe, expect, it } from 'vitest';
import {
  articleHref,
  collectTags,
  getArticlesByCategorySlug,
  getArticlesByTag,
  getArticleById,
  getLatestArticles,
  selectAdjacentArticles,
  selectRelatedArticles,
  sortArticlesByPublishedAtDesc,
  tagHref,
  toArticleCardData,
  toTagLinks,
  type Article,
} from './articles';

const ARTICLE_A: Article = {
  id: 'a',
  title: '記事 A',
  excerpt: '抜粋 A',
  publishedAt: '2026-09-01T00:00:00.000Z',
  categorySlug: 'pregnancy',
  tags: ['つわり'],
  showMedicalNotice: true,
  html: '<h2 id="heading-1">見出し</h2><p>本文</p>',
  tocItems: [{ id: 'heading-1', text: '見出し', level: 2 }],
};

const ARTICLE_B: Article = {
  id: 'b',
  title: '記事 B',
  excerpt: '抜粋 B',
  publishedAt: '2026-09-02T00:00:00.000Z',
  categorySlug: 'pregnancy',
  tags: ['つわり', '胎動'],
  showMedicalNotice: false,
  html: '',
  tocItems: [],
};

const ARTICLE_C: Article = {
  id: 'c',
  title: '記事 C',
  excerpt: '抜粋 C',
  publishedAt: '2026-09-03T00:00:00.000Z',
  categorySlug: 'birth',
  tags: [],
  showMedicalNotice: false,
  html: '',
  tocItems: [],
};

const ARTICLES = [ARTICLE_A, ARTICLE_B, ARTICLE_C];

describe('articleHref', () => {
  it('記事ページの URL を返す', () => {
    expect(articleHref(ARTICLE_A)).toBe('/articles/a/');
  });
});

describe('tagHref / toTagLinks', () => {
  it('タグページの URL を返す', () => {
    expect(tagHref('つわり')).toBe('/tags/つわり/');
  });

  it('タグのリンク一覧に変換する', () => {
    expect(toTagLinks(['つわり', '胎動'])).toEqual([
      { label: 'つわり', href: '/tags/つわり/' },
      { label: '胎動', href: '/tags/胎動/' },
    ]);
  });
});

describe('sortArticlesByPublishedAtDesc / getLatestArticles', () => {
  it('公開日の降順に並べる', () => {
    expect(sortArticlesByPublishedAtDesc(ARTICLES).map((article) => article.id)).toEqual([
      'c',
      'b',
      'a',
    ]);
  });

  it('先頭から limit 件を返す', () => {
    expect(getLatestArticles(ARTICLES, 2).map((article) => article.id)).toEqual(['c', 'b']);
  });
});

describe('getArticleById', () => {
  it('id で記事を取得する', () => {
    expect(getArticleById(ARTICLES, 'b')?.title).toBe('記事 B');
  });

  it('存在しない id では undefined を返す', () => {
    expect(getArticleById(ARTICLES, 'zzz')).toBeUndefined();
  });
});

describe('getArticlesByCategorySlug / getArticlesByTag', () => {
  it('カテゴリで絞り込み公開日の降順に並べる', () => {
    expect(getArticlesByCategorySlug(ARTICLES, 'pregnancy').map((article) => article.id)).toEqual([
      'b',
      'a',
    ]);
  });

  it('タグで絞り込む', () => {
    expect(getArticlesByTag(ARTICLES, '胎動').map((article) => article.id)).toEqual(['b']);
  });
});

describe('collectTags', () => {
  it('タグを出現回数降順（同数は名前順）で集計する', () => {
    expect(collectTags(ARTICLES)).toEqual([
      { label: 'つわり', count: 2 },
      { label: '胎動', count: 1 },
    ]);
  });
});

describe('selectRelatedArticles', () => {
  it('同じカテゴリの他の記事を新しい順に返す', () => {
    expect(selectRelatedArticles(ARTICLES, ARTICLE_A).map((article) => article.id)).toEqual(['b']);
  });

  it('limit を超えない', () => {
    expect(selectRelatedArticles(ARTICLES, ARTICLE_A, 0)).toEqual([]);
  });
});

describe('selectAdjacentArticles', () => {
  it('前の記事（古い）と次の記事（新しい）を返す', () => {
    const adjacent = selectAdjacentArticles(ARTICLES, ARTICLE_B);
    expect(adjacent.prev?.id).toBe('a');
    expect(adjacent.next?.id).toBe('c');
  });

  it('先頭の記事では次の記事のみ返す', () => {
    const adjacent = selectAdjacentArticles(ARTICLES, ARTICLE_C);
    expect(adjacent.prev?.id).toBe('b');
    expect(adjacent.next).toBeUndefined();
  });

  it('存在しない記事では空を返す', () => {
    expect(selectAdjacentArticles([], ARTICLE_A)).toEqual({});
  });
});

describe('toArticleCardData', () => {
  it('カード表示に必要な値へ変換する', () => {
    expect(toArticleCardData(ARTICLE_B)).toEqual({
      title: '記事 B',
      excerpt: '抜粋 B',
      href: '/articles/b/',
      publishedAt: '2026-09-02T00:00:00.000Z',
      categoryName: '妊娠期',
      categoryHref: '/categories/pregnancy/',
      tags: [
        { label: 'つわり', href: '/tags/つわり/' },
        { label: '胎動', href: '/tags/胎動/' },
      ],
      eyecatchUrl: undefined,
      eyecatchAlt: undefined,
    });
  });

  it('存在しないカテゴリでは例外を投げる', () => {
    const broken = { ...ARTICLE_A, categorySlug: 'unknown' } as unknown as Article;
    expect(() => toArticleCardData(broken)).toThrow('unknown category: unknown');
  });
});
