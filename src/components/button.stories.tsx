import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
  title: '基本/Button',
  component: Button,
  args: {
    children: '記事を読む',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'text'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
  },
};

export const AsLink: Story = {
  args: {
    href: '/articles/',
  },
};
