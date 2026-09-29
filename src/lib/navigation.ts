import { CATEGORIES, categoryHref } from './categories';

export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: '記事一覧', href: '/articles/' },
  ...CATEGORIES.map((category) => ({ label: category.name, href: categoryHref(category) })),
  { label: 'このブログについて', href: '/about/' },
];

export const FOOTER_LINKS: NavLink[] = [
  { label: 'このブログについて', href: '/about/' },
  { label: 'お問い合わせ', href: '/contact/' },
  { label: 'プライバシーポリシー', href: '/privacy/' },
];
