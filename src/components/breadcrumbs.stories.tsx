import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breadcrumbs } from './breadcrumbs';

const meta = {
  title: '導線/Breadcrumbs',
  component: Breadcrumbs,
} satisfies Meta<typeof Breadcrumbs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { label: 'トップ', href: '/' },
      { label: '記事一覧', href: '/articles/' },
      { label: '夜泣きとの向き合い方' },
    ],
  },
};

export const Single: Story = {
  args: {
    items: [{ label: 'トップ' }],
  },
};
