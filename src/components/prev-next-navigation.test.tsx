import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { PrevNextNavigation } from './prev-next-navigation';

const prev = { title: '前の記事のタイトル', href: '/articles/prev/' };
const next = { title: '次の記事のタイトル', href: '/articles/next/' };

describe('PrevNextNavigation', () => {
  it('前後の記事リンクを両方描画する', () => {
    render(<PrevNextNavigation prev={prev} next={next} />);

    expect(screen.getByText('前の記事')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '前の記事のタイトル' })).toHaveAttribute(
      'href',
      '/articles/prev/',
    );
    expect(screen.getByText('次の記事')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: '次の記事のタイトル' })).toHaveAttribute(
      'href',
      '/articles/next/',
    );
  });

  it('prev のみ渡すと前の記事だけ描画する', () => {
    render(<PrevNextNavigation prev={prev} />);

    expect(screen.getByRole('link', { name: '前の記事のタイトル' })).toBeInTheDocument();
    expect(screen.queryByText('次の記事')).not.toBeInTheDocument();
  });

  it('next のみ渡すと次の記事だけ描画する', () => {
    render(<PrevNextNavigation next={next} />);

    expect(screen.queryByText('前の記事')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: '次の記事のタイトル' })).toBeInTheDocument();
  });

  it('両方ないときは何も描画しない', () => {
    const { container } = render(<PrevNextNavigation />);

    expect(container.firstChild).toBeNull();
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<PrevNextNavigation prev={prev} next={next} />);

    await expectNoA11yViolations(container);
  });
});
