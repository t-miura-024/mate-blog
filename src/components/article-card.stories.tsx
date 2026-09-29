import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleCard } from './article-card';

const meta = {
  title: '記事/ArticleCard',
  component: ArticleCard,
  args: {
    title: '夜泣きとの向き合い方',
    excerpt: '夜泣きが続くときの工夫をまとめました。無理のない範囲で試せる方法を紹介します。',
    href: '/articles/yonaki/',
    publishedAt: '2026-09-29',
    categoryName: '育児',
    categoryHref: '/categories/ikuji/',
    tags: [{ label: '夜泣き', href: '/tags/yonaki/' }],
    eyecatchUrl: '/images/eyecatch.jpg',
    eyecatchAlt: '星空の写真',
  },
} satisfies Meta<typeof ArticleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutImage: Story = {
  args: {
    eyecatchUrl: undefined,
    eyecatchAlt: undefined,
  },
};

export const WithoutTags: Story = {
  args: {
    tags: undefined,
  },
};
