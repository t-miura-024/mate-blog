import type { Meta, StoryObj } from '@storybook/react-vite';
import { Pagination } from './pagination';

const meta = {
  title: '導線/Pagination',
  component: Pagination,
  args: {
    totalPages: 5,
    basePath: '/articles/',
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

export const First: Story = {
  args: {
    currentPage: 1,
  },
};

export const Middle: Story = {
  args: {
    currentPage: 3,
  },
};

export const Last: Story = {
  args: {
    currentPage: 5,
  },
};
