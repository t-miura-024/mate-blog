import type { Meta, StoryObj } from '@storybook/react-vite';
import { RelatedArticles } from './related-articles';

const meta = {
  title: '記事/RelatedArticles',
  component: RelatedArticles,
  args: {
    articles: [
      {
        title: '夜泣きとの向き合い方',
        excerpt: '夜泣きが続くときの工夫をまとめました。',
        href: '/articles/yonaki/',
        publishedAt: '2026-09-29',
        categoryName: '育児',
        categoryHref: '/categories/ikuji/',
      },
      {
        title: '離乳食のはじめ方',
        excerpt: '離乳食を始めるときの目安を紹介します。',
        href: '/articles/rinyushoku/',
        publishedAt: '2026-09-20',
        categoryName: '育児',
        categoryHref: '/categories/ikuji/',
      },
      {
        title: '産後の睡眠の工夫',
        excerpt: '細切れの睡眠と付き合う工夫をまとめました。',
        href: '/articles/suimin/',
        publishedAt: '2026-09-10',
        categoryName: '出産',
        categoryHref: '/categories/syussan/',
      },
    ],
  },
} satisfies Meta<typeof RelatedArticles>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Single: Story = {
  args: {
    articles: [
      {
        title: '夜泣きとの向き合い方',
        excerpt: '夜泣きが続くときの工夫をまとめました。',
        href: '/articles/yonaki/',
        publishedAt: '2026-09-29',
        categoryName: '育児',
        categoryHref: '/categories/ikuji/',
      },
    ],
  },
};

export const Empty: Story = {
  args: {
    articles: [],
  },
};
