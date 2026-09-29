import type { Meta, StoryObj } from '@storybook/react-vite';
import { TagList } from './tag-list';

const meta = {
  title: '導線/TagList',
  component: TagList,
  args: {
    tags: [
      { label: '離乳食', href: '/tags/rinyushoku/' },
      { label: '夜泣き', href: '/tags/yonaki/' },
      { label: '保湿', href: '/tags/hoshitsu/' },
    ],
  },
} satisfies Meta<typeof TagList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    tags: [],
  },
};
