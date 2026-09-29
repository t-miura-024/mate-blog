import type { Meta, StoryObj } from '@storybook/react-vite';
import { PageTitle } from './page-title';

const meta = {
  title: '基本/PageTitle',
  component: PageTitle,
  args: {
    children: '記事一覧',
  },
} satisfies Meta<typeof PageTitle>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithDescription: Story = {
  args: {
    description: '妊娠・出産・育児の記録です',
  },
};
