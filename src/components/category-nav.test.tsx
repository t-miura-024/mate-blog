import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { CategoryNav } from './category-nav';

const categories = [
  { name: '妊娠', href: '/categories/ninshin/' },
  { name: '出産', href: '/categories/shussan/' },
  { name: '育児', href: '/categories/ikuji/' },
];

describe('CategoryNav', () => {
  it('全カテゴリを描画する', () => {
    render(<CategoryNav categories={categories} />);

    for (const category of categories) {
      expect(screen.getByRole('link', { name: category.name })).toHaveAttribute(
        'href',
        category.href,
      );
    }
  });

  it('currentHref の項目に aria-current を付与する', () => {
    render(<CategoryNav categories={categories} currentHref="/categories/shussan/" />);

    expect(screen.getByRole('link', { name: '出産' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: '妊娠' })).not.toHaveAttribute('aria-current');
  });

  it('a11y 違反がない', async () => {
    const { container } = render(
      <CategoryNav categories={categories} currentHref="/categories/shussan/" />,
    );

    await expectNoA11yViolations(container);
  });
});
