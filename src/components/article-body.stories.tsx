import type { Meta, StoryObj } from '@storybook/react-vite';
import { ArticleBody } from './article-body';

const meta = {
  title: '記事/ArticleBody',
  component: ArticleBody,
} satisfies Meta<typeof ArticleBody>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <h2>見出しの例</h2>
        <p>本文の例です。読みやすい行間と余白で表示されます。</p>
        <ul>
          <li>箇条書きの例</li>
          <li>2 つめの項目</li>
        </ul>
      </>
    ),
  },
};
