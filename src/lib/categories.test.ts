import { describe, expect, it } from 'vitest';
import { CATEGORIES, categoryHref, getCategoryBySlug } from './categories';

describe('getCategoryBySlug', () => {
  it('存在する slug のカテゴリを返す', () => {
    expect(getCategoryBySlug('pregnancy')).toEqual({ slug: 'pregnancy', name: '妊娠期' });
  });

  it('存在しない slug では undefined を返す', () => {
    expect(getCategoryBySlug('unknown')).toBeUndefined();
  });
});

describe('categoryHref', () => {
  it('カテゴリページの URL を返す', () => {
    expect(categoryHref(CATEGORIES[1])).toBe('/categories/birth/');
  });
});
