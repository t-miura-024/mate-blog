import { describe, expect, it } from 'vitest';
import { FOOTER_LINKS, NAV_LINKS } from './navigation';

describe('NAV_LINKS', () => {
  it('記事一覧・3 カテゴリ・ブログ紹介を含む', () => {
    expect(NAV_LINKS.map((link) => link.href)).toEqual([
      '/articles/',
      '/categories/pregnancy/',
      '/categories/birth/',
      '/categories/childcare/',
      '/about/',
    ]);
  });
});

describe('FOOTER_LINKS', () => {
  it('ブログ紹介・お問い合わせ・プライバシーポリシーを含む', () => {
    expect(FOOTER_LINKS.map((link) => link.href)).toEqual(['/about/', '/contact/', '/privacy/']);
  });
});
