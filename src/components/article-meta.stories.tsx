import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleMeta } from './article-meta';

const meta = {
  title: '記事/ArticleMeta',
  component: ArticleMeta,
  args: {
    publishedAt: '2026-09-29',
    categoryName: '育児',
    categoryHref: '/categories/ikuji/',
    tags: [
      { label: '離乳食', href: '/tags/rinyushoku/' },
      { label: '夜泣き', href: '/tags/yonaki/' },
    ],
  },
} satisfies Meta<typeof ArticleMeta>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutTags: Story = {
  args: {
    tags: undefined,
  },
};
