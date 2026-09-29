import type { Meta, StoryObj } from '@storybook/react-vite';
import { CategoryNav } from './category-nav';

const meta = {
  title: '導線/CategoryNav',
  component: CategoryNav,
  args: {
    categories: [
      { name: '妊娠', href: '/categories/ninshin/' },
      { name: '出産', href: '/categories/shussan/' },
      { name: '育児', href: '/categories/ikuji/' },
    ],
  },
} satisfies Meta<typeof CategoryNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithCurrent: Story = {
  args: {
    currentHref: '/categories/shussan/',
  },
};
