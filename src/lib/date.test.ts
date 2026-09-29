import { describe, expect, it } from 'vitest';
import { formatDate } from './date';

describe('formatDate', () => {
  it('ISO日付を日本語の長い形式に整形する', () => {
    expect(formatDate('2026-09-29')).toBe('2026年9月29日');
  });

  it('タイムゾーン境界のUTC時刻をJSTの日付に変換する', () => {
    expect(formatDate('2026-09-28T15:00:00.000Z')).toBe('2026年9月29日');
  });

  it('不正な日付では空文字を返す', () => {
    expect(formatDate('not-a-date')).toBe('');
  });
});
