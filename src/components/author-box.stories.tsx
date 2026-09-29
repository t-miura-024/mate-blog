import type { Meta, StoryObj } from '@storybook/react-vite';
import { AuthorBox } from './author-box';

const meta = {
  title: '記事/AuthorBox',
  component: AuthorBox,
  args: {
    name: 'そらまめ',
    description: '二児の母です。妊娠・出産・育児の体験を綴っています。',
  },
} satisfies Meta<typeof AuthorBox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
