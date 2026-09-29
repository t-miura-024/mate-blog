import { describe, expect, it, vi } from 'vitest';
import { createClient } from 'microcms-js-sdk';
import {
  createArticleSource,
  createMicrocmsClient,
  getArticleSource,
  parseTags,
  toArticle,
  toCategorySlug,
  type MicrocmsArticleRaw,
  type MicrocmsClient,
} from './microcms';

vi.mock('microcms-js-sdk', () => ({ createClient: vi.fn() }));

function makeRaw(overrides: Partial<MicrocmsArticleRaw> = {}): MicrocmsArticleRaw {
  return {
    id: 'article-1',
    title: 'タイトル',
    body: '<h2>見出し</h2><p>本文テキスト</p>',
    category: ['妊娠期'],
    tags: 'タグA,タグB',
    showMedicalNotice: true,
    publishedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  };
}

function makePagedClient(
  totalCount: number,
): MicrocmsClient & { listCalls: { limit: number; offset: number }[] } {
  const listCalls: { limit: number; offset: number }[] = [];
  const client: MicrocmsClient = {
    list: async (params) => {
      listCalls.push(params);
      const remaining = totalCount - params.offset;
      const count = Math.min(params.limit, Math.max(remaining, 0));
      const contents = Array.from({ length: count }, (_, index) =>
        makeRaw({ id: `article-${params.offset + index + 1}` }),
      );
      return { contents, totalCount, limit: params.limit, offset: params.offset };
    },
    detail: async (id) => makeRaw({ id }),
  };
  return { ...client, listCalls };
}

describe('parseTags', () => {
  it('undefined は空配列になる', () => {
    expect(parseTags(undefined)).toEqual([]);
  });

  it('空文字は空配列になる', () => {
    expect(parseTags('')).toEqual([]);
  });

  it('カンマ区切りを分割する', () => {
    expect(parseTags('妊娠,出産,育児')).toEqual(['妊娠', '出産', '育児']);
  });

  it('全角カンマ混在を分割する', () => {
    expect(parseTags('妊娠、出産,育児')).toEqual(['妊娠', '出産', '育児']);
  });

  it('前後の空白を取り除く', () => {
    expect(parseTags(' 妊娠 ,　出産 ')).toEqual(['妊娠', '出産']);
  });

  it('空要素を取り除く', () => {
    expect(parseTags('妊娠,,、,出産,')).toEqual(['妊娠', '出産']);
  });

  it('重複を取り除き、初出順を保つ', () => {
    expect(parseTags('出産,妊娠,出産,育児,妊娠')).toEqual(['出産', '妊娠', '育児']);
  });
});

describe('toCategorySlug', () => {
  it('妊娠期は pregnancy になる', () => {
    expect(toCategorySlug('妊娠期')).toBe('pregnancy');
  });

  it('出産は birth になる', () => {
    expect(toCategorySlug('出産')).toBe('birth');
  });

  it('育児期は childcare になる', () => {
    expect(toCategorySlug('育児期')).toBe('childcare');
  });

  it('未知の値は throw する', () => {
    expect(() => toCategorySlug('離乳食')).toThrow();
  });
});

describe('toArticle', () => {
  it('アイキャッチありの記事を変換する', () => {
    const article = toArticle(
      makeRaw({
        eyecatch: { url: 'https://example.com/a.jpg', width: 1200, height: 630 },
        eyecatchAlt: '代替テキスト',
      }),
    );

    expect(article.id).toBe('article-1');
    expect(article.title).toBe('タイトル');
    expect(article.excerpt).toBe('見出し 本文テキスト');
    expect(article.publishedAt).toBe('2026-01-01T00:00:00.000Z');
    expect(article.categorySlug).toBe('pregnancy');
    expect(article.tags).toEqual(['タグA', 'タグB']);
    expect(article.showMedicalNotice).toBe(true);
    expect(article.eyecatchUrl).toBe('https://example.com/a.jpg');
    expect(article.eyecatchAlt).toBe('代替テキスト');
    expect(article.html).toContain('<h2 id="heading-1">見出し</h2>');
    expect(article.tocItems).toEqual([{ id: 'heading-1', text: '見出し', level: 2 }]);
  });

  it('アイキャッチなし・showMedicalNotice 未指定は false・undefined になる', () => {
    const raw = makeRaw({ showMedicalNotice: undefined });
    delete raw.tags;
    const article = toArticle(raw);

    expect(article.showMedicalNotice).toBe(false);
    expect(article.eyecatchUrl).toBeUndefined();
    expect(article.eyecatchAlt).toBeUndefined();
    expect(article.tags).toEqual([]);
  });

  it('カテゴリ配列の先頭を使う', () => {
    const article = toArticle(makeRaw({ category: ['出産', '妊娠期'] }));

    expect(article.categorySlug).toBe('birth');
  });

  it('カテゴリが空配列なら throw する', () => {
    expect(() => toArticle(makeRaw({ category: [] }))).toThrow();
  });

  it('未知のカテゴリなら throw する', () => {
    expect(() => toArticle(makeRaw({ category: ['離乳食'] }))).toThrow();
  });
});

describe('createMicrocmsClient', () => {
  it('serviceDomain が空文字なら throw する', () => {
    expect(() => createMicrocmsClient({ serviceDomain: '', apiKey: 'key' })).toThrow();
  });

  it('apiKey が空文字なら throw する', () => {
    expect(() => createMicrocmsClient({ serviceDomain: 'domain', apiKey: '' })).toThrow();
  });

  it('list は endpoint と limit/offset を渡して getList を呼ぶ', async () => {
    const getList = vi.fn(async () => ({ contents: [], totalCount: 0, limit: 100, offset: 20 }));
    vi.mocked(createClient).mockReturnValue({ getList } as never);
    const client = createMicrocmsClient({ serviceDomain: 'domain', apiKey: 'key' });

    await client.list({ limit: 100, offset: 20 });

    expect(getList).toHaveBeenCalledWith({
      endpoint: 'articles',
      queries: { limit: 100, offset: 20 },
    });
  });

  it('detail は contentId と draftKey を渡して getListDetail を呼ぶ', async () => {
    const getListDetail = vi.fn(async () => makeRaw({ id: 'article-9' }));
    vi.mocked(createClient).mockReturnValue({ getListDetail } as never);
    const client = createMicrocmsClient({ serviceDomain: 'domain', apiKey: 'key' });

    const raw = await client.detail('article-9', 'draft-key-1');

    expect(getListDetail).toHaveBeenCalledWith({
      endpoint: 'articles',
      contentId: 'article-9',
      queries: { draftKey: 'draft-key-1' },
    });
    expect(raw.id).toBe('article-9');
  });
});

describe('createArticleSource', () => {
  it('totalCount 150 を 2 回の呼び出しで取得する', async () => {
    const client = makePagedClient(150);
    const source = createArticleSource(client);

    const articles = await source.listAll();

    expect(articles).toHaveLength(150);
    expect(client.listCalls).toEqual([
      { limit: 100, offset: 0 },
      { limit: 100, offset: 100 },
    ]);
    expect(articles[0]?.id).toBe('article-1');
    expect(articles[149]?.id).toBe('article-150');
  });

  it('2 回目の listAll はクライアントを呼ばない', async () => {
    const client = makePagedClient(10);
    const source = createArticleSource(client);

    await source.listAll();
    await source.listAll();

    expect(client.listCalls).toHaveLength(1);
  });

  it('空ページで無限ループにならない', async () => {
    const client: MicrocmsClient = {
      list: async () => ({ contents: [], totalCount: 5, limit: 100, offset: 0 }),
      detail: async (id) => makeRaw({ id }),
    };
    const source = createArticleSource(client);

    expect(await source.listAll()).toEqual([]);
  });

  it('getById は listAll の結果から探し、追加で呼ばない', async () => {
    const client = makePagedClient(10);
    const source = createArticleSource(client);

    expect((await source.getById('article-3'))?.title).toBe('タイトル');
    expect(await source.getById('missing')).toBeUndefined();
    expect(client.listCalls).toHaveLength(1);
  });

  it('getDraft は draftKey を渡して変換する', async () => {
    const detail = vi.fn(async (id: string, draftKey?: string) =>
      makeRaw({ id, title: `下書き:${draftKey}` }),
    );
    const client: MicrocmsClient = {
      list: async () => ({ contents: [], totalCount: 0, limit: 100, offset: 0 }),
      detail,
    };
    const source = createArticleSource(client);

    const article = await source.getDraft('article-9', 'draft-key-1');

    expect(detail).toHaveBeenCalledWith('article-9', 'draft-key-1');
    expect(article?.title).toBe('下書き:draft-key-1');
  });

  it('getDraft は detail が throw したら undefined を返す', async () => {
    const client: MicrocmsClient = {
      list: async () => ({ contents: [], totalCount: 0, limit: 100, offset: 0 }),
      detail: async () => {
        throw new Error('404');
      },
    };
    const source = createArticleSource(client);

    expect(await source.getDraft('missing', 'bad-key')).toBeUndefined();
  });

  it('getDraft は detail が undefined を返したら undefined を返す', async () => {
    const client: MicrocmsClient = {
      list: async () => ({ contents: [], totalCount: 0, limit: 100, offset: 0 }),
      detail: async () => undefined as unknown as MicrocmsArticleRaw,
    };
    const source = createArticleSource(client);

    expect(await source.getDraft('missing', 'bad-key')).toBeUndefined();
  });
});

describe('getArticleSource', () => {
  it('同一 env では同一インスタンスを返す', () => {
    const env = { serviceDomain: 'cache-same', apiKey: 'key' };

    expect(getArticleSource(env)).toBe(getArticleSource(env));
  });

  it('別 env では別インスタンスを返す', () => {
    const first = getArticleSource({ serviceDomain: 'cache-a', apiKey: 'key' });
    const second = getArticleSource({ serviceDomain: 'cache-b', apiKey: 'key' });

    expect(first).not.toBe(second);
  });
});
