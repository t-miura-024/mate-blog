import { describe, expect, it } from 'vitest';
import { buildPageTitle, SITE_NAME } from './site';

describe('buildPageTitle', () => {
  it('ページタイトルがあるときはサイト名を後置する', () => {
    expect(buildPageTitle('記事一覧')).toBe(`記事一覧｜${SITE_NAME}`);
  });

  it('ページタイトルがないときはサイト名のみを返す', () => {
    expect(buildPageTitle()).toBe(SITE_NAME);
  });
});
