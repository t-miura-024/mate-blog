export type ArticleStructuredData = {
  '@context': 'https://schema.org';
  '@type': 'Article';
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  mainEntityOfPage: string;
  author: { '@type': 'Person'; name: string };
  publisher: { '@type': 'Organization'; name: string };
};

export type ArticleStructuredDataInput = {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt?: string;
  imageUrl?: string;
  authorName: string;
  siteName: string;
};

export function buildArticleStructuredData(
  input: ArticleStructuredDataInput,
): ArticleStructuredData {
  const structuredData: ArticleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: input.title,
    description: input.description,
    datePublished: input.publishedAt,
    mainEntityOfPage: input.url,
    author: { '@type': 'Person', name: input.authorName },
    publisher: { '@type': 'Organization', name: input.siteName },
  };
  if (input.updatedAt !== undefined) {
    structuredData.dateModified = input.updatedAt;
  }
  if (input.imageUrl !== undefined) {
    structuredData.image = input.imageUrl;
  }
  return structuredData;
}

export function serializeStructuredData(structuredData: ArticleStructuredData): string {
  return JSON.stringify(structuredData)
    .replace(/</g, '\\u003c')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029');
}
