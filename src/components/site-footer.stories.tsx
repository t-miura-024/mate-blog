import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteFooter } from './site-footer';

const meta = {
  title: 'レイアウト/SiteFooter',
  component: SiteFooter,
  args: {
    siteName: 'おなかのそと',
    links: [
      { label: '記事一覧', href: '/articles/' },
      { label: 'カテゴリー', href: '/categories/' },
      { label: 'お問い合わせ', href: '/contact/' },
    ],
  },
} satisfies Meta<typeof SiteFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
