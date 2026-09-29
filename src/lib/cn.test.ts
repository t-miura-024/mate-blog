import { describe, expect, it } from 'vitest';
import { cn } from './cn';

describe('cn', () => {
  it('複数のクラスを結合する', () => {
    expect(cn('text-body', 'font-medium')).toBe('text-body font-medium');
  });

  it('falsy な値は無視する', () => {
    expect(cn('text-body', undefined, false, null, 'font-medium')).toBe('text-body font-medium');
  });

  it('条件付きクラスを扱える', () => {
    expect(cn('text-body', { 'font-bold': true, 'font-medium': false })).toBe(
      'text-body font-bold',
    );
  });

  it('競合する Tailwind クラスは後勝ちで解決する', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4');
  });
});
