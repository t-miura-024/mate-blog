import type { Meta, StoryObj } from '@storybook/react-vite';
import { ShareButtons } from './share-buttons';

const meta = {
  title: '記事/ShareButtons',
  component: ShareButtons,
  args: {
    url: 'https://example.com/articles/1/',
    title: 'はじめての離乳食',
  },
} satisfies Meta<typeof ShareButtons>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
