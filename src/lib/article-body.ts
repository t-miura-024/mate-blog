import { load } from 'cheerio';

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

export type ProcessedArticleBody = {
  html: string;
  tocItems: TocItem[];
};

export function processArticleBody(html: string): ProcessedArticleBody {
  if (html.trim() === '') {
    return { html, tocItems: [] };
  }

  const $ = load(html, null, false);
  const tocItems: TocItem[] = [];

  $('h2, h3').each((index, element) => {
    const $heading = $(element);
    const id = `heading-${index + 1}`;
    $heading.attr('id', id);
    tocItems.push({
      id,
      text: $heading.text().trim(),
      level: $heading.is('h2') ? 2 : 3,
    });
  });

  return { html: $.html(), tocItems };
}

export function extractPlainText(html: string): string {
  const withBreaks = html.replace(
    /<\/(?:p|h[1-6]|li|div|section|figure|figcaption|blockquote|tr)>/gi,
    '\n',
  );
  const $ = load(withBreaks, null, false);
  $('script, style').remove();
  return $.root().text().replace(/\s+/g, ' ').trim();
}

export function buildExcerpt(html: string, maxLength = 110): string {
  const text = extractPlainText(html);
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength - 1)}…`;
}
