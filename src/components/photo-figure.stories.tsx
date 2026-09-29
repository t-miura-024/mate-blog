import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhotoFigure } from './photo-figure';

const meta = {
  title: '記事/PhotoFigure',
  component: PhotoFigure,
  args: {
    src: '/images/sample.jpg',
    alt: '赤ちゃんの靴下の写真',
    caption: 'はじめての靴下',
  },
} satisfies Meta<typeof PhotoFigure>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithoutCaption: Story = {
  args: {
    caption: undefined,
  },
};

export const HeroImage: Story = {
  args: {
    src: 'https://images.microcms-assets.io/assets/aaa/bbb/photo.png',
    caption: undefined,
    aspect: 'video',
    loading: 'eager',
    fetchPriority: 'high',
  },
};
