import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { Container } from './container';

describe('Container', () => {
  it('子要素を描画する', () => {
    render(<Container>本文</Container>);

    expect(screen.getByText('本文')).toBeInTheDocument();
  });

  it('既定ではサイト全体の最大幅になる', () => {
    render(<Container>本文</Container>);

    expect(screen.getByText('本文').className).toContain('max-w-site');
  });

  it('size="narrow" では記事本文の最大幅になる', () => {
    render(<Container size="narrow">本文</Container>);

    expect(screen.getByText('本文').className).toContain('max-w-content');
  });
});
