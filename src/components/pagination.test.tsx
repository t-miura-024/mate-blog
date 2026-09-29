import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { Pagination } from './pagination';

describe('Pagination', () => {
  it('1 ページ目では前のページリンクを表示しない', () => {
    render(<Pagination currentPage={1} totalPages={3} basePath="/articles/" />);

    expect(screen.queryByRole('link', { name: '前のページ' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '次のページ' })).toHaveAttribute(
      'href',
      '/articles/page/2/',
    );
    expect(screen.getByText('1 / 3')).toHaveAttribute('aria-current', 'page');
  });

  it('中間ページでは前後どちらのリンクも正しい href で表示する', () => {
    render(<Pagination currentPage={2} totalPages={3} basePath="/articles/" />);

    expect(screen.getByRole('link', { name: '前のページ' })).toHaveAttribute('href', '/articles/');
    expect(screen.getByRole('link', { name: '次のページ' })).toHaveAttribute(
      'href',
      '/articles/page/3/',
    );
  });

  it('最終ページでは次のページリンクを表示しない', () => {
    render(<Pagination currentPage={3} totalPages={3} basePath="/articles/" />);

    expect(screen.queryByRole('link', { name: '次のページ' })).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '前のページ' })).toHaveAttribute(
      'href',
      '/articles/page/2/',
    );
  });

  it('a11y 違反がない', async () => {
    const { container } = render(
      <Pagination currentPage={2} totalPages={3} basePath="/articles/" />,
    );

    await expectNoA11yViolations(container);
  });
});
