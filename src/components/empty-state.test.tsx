import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EmptyState } from './empty-state';
import { expectNoA11yViolations } from '@/test-utils/a11y';

describe('EmptyState', () => {
  it('title が描画される', () => {
    render(<EmptyState title="記事がありません" />);

    expect(screen.getByText('記事がありません')).toBeInTheDocument();
  });

  it('description と children があるときに描画される', () => {
    render(
      <EmptyState title="記事がありません" description="条件を変えて探してみてください">
        <button type="button">条件をリセット</button>
      </EmptyState>,
    );

    expect(screen.getByText('条件を変えて探してみてください')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '条件をリセット' })).toBeInTheDocument();
  });

  it('description と children がなくても崩れず描画される', () => {
    const { container } = render(<EmptyState title="記事がありません" />);

    expect(screen.getByText('記事がありません')).toBeInTheDocument();
    expect(container.querySelector('.mt-2')).toBeNull();
    expect(container.querySelector('.mt-6')).toBeNull();
  });

  it('アクセシビリティ違反がない', async () => {
    const { container } = render(
      <EmptyState title="記事がありません" description="条件を変えて探してみてください" />,
    );

    await expectNoA11yViolations(container);
  });
});
