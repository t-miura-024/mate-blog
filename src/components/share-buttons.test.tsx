import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { ShareButtons } from './share-buttons';

const url = 'https://example.com/articles/1/';
const title = 'はじめての離乳食';

describe('ShareButtons', () => {
  it('X と LINE のリンクにエンコード済みの値が含まれる', () => {
    render(<ShareButtons url={url} title={title} />);

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    expect(screen.getByRole('link', { name: 'X でシェア' }).getAttribute('href')).toContain(
      encodedUrl,
    );
    expect(screen.getByRole('link', { name: 'X でシェア' }).getAttribute('href')).toContain(
      encodedTitle,
    );
    expect(screen.getByRole('link', { name: 'LINE でシェア' }).getAttribute('href')).toContain(
      encodedUrl,
    );
  });

  it('両リンクが新しいタブで開く設定になっている', () => {
    render(<ShareButtons url={url} title={title} />);

    for (const name of ['X でシェア', 'LINE でシェア']) {
      const link = screen.getByRole('link', { name });
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('rel')).toContain('noreferrer');
    }
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<ShareButtons url={url} title={title} />);

    await expectNoA11yViolations(container);
  });
});
