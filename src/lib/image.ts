const MICROCMS_IMAGE_HOST = 'images.microcms-assets.io';
const DEFAULT_QUALITY = 80;
const DEFAULT_FORMAT = 'webp';

export type ImageParams = {
  width?: number;
  quality?: number;
  format?: 'webp';
};

export function buildImageUrl(url: string, params: ImageParams): string {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return url;
  }

  if (parsed.hostname !== MICROCMS_IMAGE_HOST) {
    return url;
  }

  if (params.width !== undefined) {
    parsed.searchParams.set('w', String(params.width));
  }
  parsed.searchParams.set('q', String(params.quality ?? DEFAULT_QUALITY));
  parsed.searchParams.set('fm', params.format ?? DEFAULT_FORMAT);

  return parsed.href;
}

export function buildImageSrcSet(
  url: string,
  widths: number[],
  params: Omit<ImageParams, 'width'> = {},
): string {
  if (widths.length === 0) {
    return '';
  }

  if (buildImageUrl(url, { ...params, width: widths[0] }) === url) {
    return '';
  }

  return widths.map((width) => `${buildImageUrl(url, { ...params, width })} ${width}w`).join(', ');
}
