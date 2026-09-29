import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteHeader } from './site-header';

const meta = {
  title: 'レイアウト/SiteHeader',
  component: SiteHeader,
  args: {
    siteName: 'おなかのそと',
    tagline: '妊娠・出産・育児を静かに読む',
    links: [
      { label: '記事一覧', href: '/articles/' },
      { label: 'カテゴリー', href: '/categories/' },
      { label: 'タグ一覧', href: '/tags/' },
      { label: 'お問い合わせ', href: '/contact/' },
    ],
  },
} satisfies Meta<typeof SiteHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
