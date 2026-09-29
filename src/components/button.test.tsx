import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { Button } from './button';

describe('Button', () => {
  it('既定では type="button" のボタンとして描画される', () => {
    render(<Button>保存する</Button>);

    expect(screen.getByRole('button', { name: '保存する' })).toHaveAttribute('type', 'button');
  });

  it('href を渡すとリンクとして描画される', () => {
    render(<Button href="/articles/">記事一覧へ</Button>);

    expect(screen.getByRole('link', { name: '記事一覧へ' })).toHaveAttribute('href', '/articles/');
  });

  it('クリックすると onClick が呼ばれる', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>押す</Button>);

    await userEvent.click(screen.getByRole('button', { name: '押す' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('variant="text" ではアクセント色のテキストスタイルになる', () => {
    render(<Button variant="text">もっと読む</Button>);

    expect(screen.getByRole('button', { name: 'もっと読む' }).className).toContain(
      'text-accent-strong',
    );
  });

  it('className で追加のクラスを渡せる', () => {
    render(<Button className="w-full">幅いっぱい</Button>);

    expect(screen.getByRole('button', { name: '幅いっぱい' }).className).toContain('w-full');
  });
});
