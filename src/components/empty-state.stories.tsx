import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';
import { EmptyState } from './empty-state';

const meta = {
  title: '基本/EmptyState',
  component: EmptyState,
  args: {
    title: '記事がありません',
  },
} satisfies Meta<typeof EmptyState>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescriptionAndAction: Story = {
  args: {
    description: '条件を変えて探してみてください',
    children: <Button variant="text">条件をリセット</Button>,
  },
};
