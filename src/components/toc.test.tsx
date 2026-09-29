import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { Toc, type TocItem } from './toc';

const items: TocItem[] = [
  { id: 'hajime-ni', text: 'はじめに', level: 2 },
  { id: 'junbi', text: '準備したもの', level: 3 },
  { id: 'matome', text: 'まとめ', level: 2 },
];

describe('Toc', () => {
  it('各項目を #id のリンクとして描画する', () => {
    render(<Toc items={items} />);

    for (const item of items) {
      expect(screen.getByRole('link', { name: item.text })).toHaveAttribute('href', `#${item.id}`);
    }
  });

  it('level 3 の項目はインデントされる', () => {
    const { container } = render(<Toc items={items} />);
    const listItems = container.querySelectorAll('li');

    expect(listItems[1]?.className).toContain('pl-4');
    expect(listItems[0]?.className).not.toContain('pl-4');
  });

  it('空配列では何も描画しない', () => {
    const { container } = render(<Toc items={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<Toc items={items} />);

    await expectNoA11yViolations(container);
  });
});
