import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { Notice } from './notice';

describe('Notice', () => {
  it('内容を note ロールで描画する', () => {
    render(<Notice>お知らせです</Notice>);

    expect(screen.getByRole('note')).toHaveTextContent('お知らせです');
  });

  it('tone="accent" ではアクセント背景になる', () => {
    render(<Notice tone="accent">強調のお知らせ</Notice>);

    expect(screen.getByRole('note').className).toContain('bg-accent-soft');
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<Notice>お知らせです</Notice>);

    await expectNoA11yViolations(container);
  });
});
