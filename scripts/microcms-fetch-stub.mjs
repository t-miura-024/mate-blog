import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const originalFetch = globalThis.fetch;

const fixturePath = join(import.meta.dirname, 'fixtures', 'microcms-articles.json');
const fixture = JSON.parse(readFileSync(fixturePath, 'utf-8'));
const articles = fixture.contents;

const jsonResponse = (payload, status) => {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { 'content-type': 'application/json' },
  });
};

const resolveMethod = (input, init) => {
  if (init?.method !== undefined) {
    return init.method;
  }
  if (input instanceof Request) {
    return input.method;
  }
  return 'GET';
};

const resolveUrl = (input) => {
  if (typeof input === 'string') {
    return new URL(input);
  }
  if (input instanceof URL) {
    return new URL(input.href);
  }
  return new URL(input.url);
};

const isArticlesRequest = (url) => {
  return url.hostname.endsWith('.microcms.io') && url.pathname.startsWith('/api/v1/articles');
};

const handleListRequest = (url) => {
  const totalCount = articles.length;
  const parsedLimit = Number(url.searchParams.get('limit'));
  const parsedOffset = Number(url.searchParams.get('offset'));
  const limit = Number.isNaN(parsedLimit) ? totalCount : parsedLimit;
  const offset = Number.isNaN(parsedOffset) ? 0 : parsedOffset;
  const contents = articles.slice(offset, offset + limit);
  return jsonResponse({ contents, limit, offset, totalCount }, 200);
};

const handleDetailRequest = (url, id) => {
  const found = articles.find((article) => article.id === id);
  if (found === undefined) {
    return jsonResponse({ message: 'The resource was not found.' }, 404);
  }
  if (url.searchParams.has('draftKey')) {
    return jsonResponse({ ...found, title: `[下書き] ${found.title}` }, 200);
  }
  return jsonResponse(found, 200);
};

globalThis.fetch = (input, init) => {
  const method = resolveMethod(input, init);
  if (method === 'GET') {
    const url = resolveUrl(input);
    if (isArticlesRequest(url)) {
      const rest = url.pathname.slice('/api/v1/articles'.length);
      if (rest === '' || rest === '/') {
        return Promise.resolve(handleListRequest(url));
      }
      const id = decodeURIComponent(rest.replace(/^\//, ''));
      if (id.includes('/') === false) {
        return Promise.resolve(handleDetailRequest(url, id));
      }
    }
  }
  return originalFetch(input, init);
};
