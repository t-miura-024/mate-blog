import { createClient } from 'microcms-js-sdk';
import { buildExcerpt, processArticleBody } from './article-body';
import type { Article } from './articles';
import type { CategorySlug } from './categories';

export type MicrocmsImage = { url: string; width: number; height: number };

export type MicrocmsArticleRaw = {
  id: string;
  title: string;
  body: string;
  eyecatch?: MicrocmsImage;
  eyecatchAlt?: string;
  category: string[];
  tags?: string;
  showMedicalNotice?: boolean;
  publishedAt: string;
};

export type MicrocmsListResponse = {
  contents: MicrocmsArticleRaw[];
  totalCount: number;
  limit: number;
  offset: number;
};

export type MicrocmsClient = {
  list(params: { limit: number; offset: number }): Promise<MicrocmsListResponse>;
  detail(id: string, draftKey?: string): Promise<MicrocmsArticleRaw>;
};

export type ArticleSource = {
  listAll(): Promise<Article[]>;
  getById(id: string): Promise<Article | undefined>;
  getDraft(id: string, draftKey: string): Promise<Article | undefined>;
};

export type MicrocmsEnv = { serviceDomain: string; apiKey: string };

const LIST_LIMIT = 100;
const ARTICLES_ENDPOINT = 'articles';

export function parseTags(value: string | undefined): string[] {
  if (value === undefined) {
    return [];
  }
  const seen = new Set<string>();
  const result: string[] = [];
  for (const part of value.split(/[,、]/)) {
    const tag = part.trim();
    if (tag === '') {
      continue;
    }
    if (seen.has(tag)) {
      continue;
    }
    seen.add(tag);
    result.push(tag);
  }
  return result;
}

export function toCategorySlug(value: string): CategorySlug {
  if (value === '妊娠期') {
    return 'pregnancy';
  }
  if (value === '出産') {
    return 'birth';
  }
  if (value === '育児期') {
    return 'childcare';
  }
  throw new Error(`unknown category: ${value}`);
}

export function toArticle(raw: MicrocmsArticleRaw): Article {
  const head = raw.category[0];
  if (head === undefined) {
    throw new Error(`empty category: ${raw.id}`);
  }
  const processed = processArticleBody(raw.body);
  const article: Article = {
    id: raw.id,
    title: raw.title,
    excerpt: buildExcerpt(raw.body),
    publishedAt: raw.publishedAt,
    categorySlug: toCategorySlug(head),
    tags: parseTags(raw.tags),
    showMedicalNotice: raw.showMedicalNotice ?? false,
    html: processed.html,
    tocItems: processed.tocItems,
  };
  if (raw.eyecatch !== undefined) {
    article.eyecatchUrl = raw.eyecatch.url;
  }
  if (raw.eyecatchAlt !== undefined) {
    article.eyecatchAlt = raw.eyecatchAlt;
  }
  return article;
}

export function createMicrocmsClient(env: MicrocmsEnv): MicrocmsClient {
  if (env.serviceDomain === '') {
    throw new Error('serviceDomain is required');
  }
  if (env.apiKey === '') {
    throw new Error('apiKey is required');
  }
  const client = createClient({ serviceDomain: env.serviceDomain, apiKey: env.apiKey });
  return {
    list: (params: { limit: number; offset: number }): Promise<MicrocmsListResponse> =>
      client.getList<MicrocmsArticleRaw>({
        endpoint: ARTICLES_ENDPOINT,
        queries: { limit: params.limit, offset: params.offset },
      }),
    detail: (id: string, draftKey?: string): Promise<MicrocmsArticleRaw> =>
      client.getListDetail<MicrocmsArticleRaw>({
        endpoint: ARTICLES_ENDPOINT,
        contentId: id,
        queries: { draftKey },
      }),
  };
}

export function createArticleSource(client: MicrocmsClient): ArticleSource {
  let cache: Article[] | undefined;

  const listAll = async (): Promise<Article[]> => {
    if (cache !== undefined) {
      return cache;
    }
    let offset = 0;
    const raws: MicrocmsArticleRaw[] = [];
    for (;;) {
      const response = await client.list({ limit: LIST_LIMIT, offset });
      raws.push(...response.contents);
      offset += LIST_LIMIT;
      if (raws.length >= response.totalCount) {
        break;
      }
      if (response.contents.length === 0) {
        break;
      }
    }
    cache = raws.map(toArticle);
    return cache;
  };

  const getById = async (id: string): Promise<Article | undefined> => {
    const articles = await listAll();
    return articles.find((article) => article.id === id);
  };

  const getDraft = async (id: string, draftKey: string): Promise<Article | undefined> => {
    try {
      const raw = await client.detail(id, draftKey);
      if (raw === undefined) {
        return undefined;
      }
      return toArticle(raw);
    } catch {
      return undefined;
    }
  };

  return { listAll, getById, getDraft };
}

const sourceCache = new Map<string, ArticleSource>();

export function getArticleSource(env: MicrocmsEnv): ArticleSource {
  const cached = sourceCache.get(env.serviceDomain);
  if (cached !== undefined) {
    return cached;
  }
  const source = createArticleSource(createMicrocmsClient(env));
  sourceCache.set(env.serviceDomain, source);
  return source;
}
