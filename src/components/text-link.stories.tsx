import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextLink } from './text-link';

const meta = {
  title: '基本/TextLink',
  component: TextLink,
  args: {
    children: '記事を読む',
  },
} satisfies Meta<typeof TextLink>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '/articles/',
  },
};

export const External: Story = {
  args: {
    href: 'https://example.com/',
    external: true,
  },
};
