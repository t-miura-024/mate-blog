import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tag } from './tag';

const meta = {
  title: '基本/Tag',
  component: Tag,
  args: {
    children: '離乳食',
  },
} satisfies Meta<typeof Tag>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AsLink: Story = {
  args: {
    href: '/tags/rinyushoku/',
  },
};
