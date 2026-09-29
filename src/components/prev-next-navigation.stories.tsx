import type { Meta, StoryObj } from '@storybook/react-vite';
import { PrevNextNavigation } from './prev-next-navigation';

const meta = {
  title: '導線/PrevNextNavigation',
  component: PrevNextNavigation,
} satisfies Meta<typeof PrevNextNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Both: Story = {
  args: {
    prev: { title: '夜泣きとの向き合い方', href: '/articles/yonaki/' },
    next: { title: '離乳食の進め方', href: '/articles/rinyushoku/' },
  },
};

export const OnlyPrev: Story = {
  args: {
    prev: { title: '夜泣きとの向き合い方', href: '/articles/yonaki/' },
  },
};

export const None: Story = {
  args: {},
};
