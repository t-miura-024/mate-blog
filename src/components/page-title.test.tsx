import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { PageTitle } from './page-title';

describe('PageTitle', () => {
  it('見出しレベル 1 として描画する', () => {
    render(<PageTitle>記事一覧</PageTitle>);

    expect(screen.getByRole('heading', { level: 1, name: '記事一覧' })).toBeInTheDocument();
  });

  it('description を渡すと説明文を描画する', () => {
    render(<PageTitle description="妊娠・出産・育児の記録です">記事一覧</PageTitle>);

    expect(screen.getByText('妊娠・出産・育児の記録です')).toBeInTheDocument();
  });

  it('a11y 違反がない', async () => {
    const { container } = render(
      <PageTitle description="妊娠・出産・育児の記録です">記事一覧</PageTitle>,
    );

    await expectNoA11yViolations(container);
  });
});
