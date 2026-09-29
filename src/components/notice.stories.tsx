import type { Meta, StoryObj } from '@storybook/react-vite';
import { Notice } from './notice';

const meta = {
  title: '基本/Notice',
  component: Notice,
  args: {
    children: 'お知らせです',
  },
} satisfies Meta<typeof Notice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Accent: Story = {
  args: {
    tone: 'accent',
    children: '強調のお知らせです',
  },
};
