import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { Tag } from './tag';

describe('Tag', () => {
  it('ラベルを span として描画する', () => {
    render(<Tag>離乳食</Tag>);

    expect(screen.getByText('離乳食').tagName).toBe('SPAN');
  });

  it('href を渡すとリンクとして描画される', () => {
    render(<Tag href="/tags/rinyushoku/">離乳食</Tag>);

    expect(screen.getByRole('link', { name: '離乳食' })).toHaveAttribute(
      'href',
      '/tags/rinyushoku/',
    );
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<Tag href="/tags/rinyushoku/">離乳食</Tag>);

    await expectNoA11yViolations(container);
  });
});
