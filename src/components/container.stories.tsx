import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './container';

const meta = {
  title: '基本/Container',
  component: Container,
  args: {
    children: 'コンテンツ',
  },
} satisfies Meta<typeof Container>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Narrow: Story = {
  args: {
    size: 'narrow',
  },
};
