import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { TextLink } from './text-link';
import { expectNoA11yViolations } from '@/test-utils/a11y';

describe('TextLink', () => {
  it('内部リンクは target なし・アイコンなしで描画される', () => {
    const { container } = render(<TextLink href="/articles/">記事を読む</TextLink>);

    const link = screen.getByRole('link', { name: '記事を読む' });
    expect(link).toHaveAttribute('href', '/articles/');
    expect(link).not.toHaveAttribute('target');
    expect(container.querySelector('svg')).toBeNull();
  });

  it('外部リンクは target・rel・アイコン付きで描画される', () => {
    const { container } = render(
      <TextLink href="https://example.com/" external={true}>
        外部サイト
      </TextLink>,
    );

    const link = screen.getByRole('link', { name: '外部サイト' });
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(container.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('アクセシビリティ違反がない', async () => {
    const { container } = render(
      <TextLink href="https://example.com/" external={true}>
        外部サイト
      </TextLink>,
    );

    await expectNoA11yViolations(container);
  });
});
