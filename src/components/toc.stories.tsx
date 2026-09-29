import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toc } from './toc';

const meta = {
  title: '記事/Toc',
  component: Toc,
  args: {
    items: [
      { id: 'hajime-ni', text: 'はじめに', level: 2 },
      { id: 'junbi', text: '準備したもの', level: 3 },
      { id: 'matome', text: 'まとめ', level: 2 },
    ],
  },
} satisfies Meta<typeof Toc>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    items: [],
  },
};
