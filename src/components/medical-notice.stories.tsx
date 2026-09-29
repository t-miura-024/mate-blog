import type { Meta, StoryObj } from '@storybook/react-vite';
import { MedicalNotice } from './medical-notice';

const meta = {
  title: '記事/MedicalNotice',
  component: MedicalNotice,
} satisfies Meta<typeof MedicalNotice>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
