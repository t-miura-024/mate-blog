import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { TagList } from './tag-list';

const tags = [
  { label: '離乳食', href: '/tags/rinyushoku/' },
  { label: '夜泣き', href: '/tags/yonaki/' },
  { label: '保湿', href: '/tags/hoshitsu/' },
];

describe('TagList', () => {
  it('タグの件数分だけリンクを描画する', () => {
    render(<TagList tags={tags} />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(tags.length);
    for (const tag of tags) {
      expect(screen.getByRole('link', { name: tag.label })).toHaveAttribute('href', tag.href);
    }
  });

  it('空配列では何も描画しない', () => {
    const { container } = render(<TagList tags={[]} />);

    expect(container).toBeEmptyDOMElement();
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<TagList tags={tags} />);

    await expectNoA11yViolations(container);
  });
});
