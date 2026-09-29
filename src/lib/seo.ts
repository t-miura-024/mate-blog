export type SeoMeta = { name: string; content: string } | { property: string; content: string };

export type SeoInput = {
  title: string;
  description: string;
  url: string;
  siteName: string;
  type: 'website' | 'article';
  imageUrl?: string;
};

export function buildSeoMeta(input: SeoInput): SeoMeta[] {
  const meta: SeoMeta[] = [
    { property: 'og:title', content: input.title },
    { property: 'og:description', content: input.description },
    { property: 'og:type', content: input.type },
    { property: 'og:url', content: input.url },
    { property: 'og:site_name', content: input.siteName },
  ];
  if (input.imageUrl !== undefined) {
    meta.push({ property: 'og:image', content: input.imageUrl });
    meta.push({ name: 'twitter:card', content: 'summary_large_image' });
    return meta;
  }
  meta.push({ name: 'twitter:card', content: 'summary' });
  return meta;
}
