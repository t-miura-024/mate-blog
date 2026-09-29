import { describe, expect, it } from 'vitest';
import { buildExcerpt, extractPlainText, processArticleBody } from './article-body';

describe('processArticleBody', () => {
  it('h2 / h3 に id を付与し、目次項目を作る', () => {
    const result = processArticleBody('<h2>見出し 2</h2><p>本文</p><h3>見出し 3</h3>');

    expect(result.tocItems).toEqual([
      { id: 'heading-1', text: '見出し 2', level: 2 },
      { id: 'heading-2', text: '見出し 3', level: 3 },
    ]);
    expect(result.html).toContain('<h2 id="heading-1">見出し 2</h2>');
    expect(result.html).toContain('<h3 id="heading-2">見出し 3</h3>');
  });

  it('見出しがない場合は目次が空になる', () => {
    const result = processArticleBody('<p>本文だけ</p>');

    expect(result.tocItems).toEqual([]);
    expect(result.html).toContain('<p>本文だけ</p>');
  });

  it('h4 以下には id を付与しない', () => {
    const result = processArticleBody('<h4>小見出し</h4>');

    expect(result.tocItems).toEqual([]);
    expect(result.html).not.toContain('id=');
  });

  it('画像や表などの要素はそのまま保持する', () => {
    const result = processArticleBody(
      '<figure><img src="/a.jpg" alt="写真" /></figure><table><tr><td>1</td></tr></table>',
    );

    expect(result.html).toContain('<img src="/a.jpg" alt="写真"');
    expect(result.html).toContain('<table>');
  });

  it('空文字はそのまま返す', () => {
    expect(processArticleBody('')).toEqual({ html: '', tocItems: [] });
  });
});

describe('extractPlainText', () => {
  it('タグを除去し、ブロック境界を空白にする', () => {
    expect(extractPlainText('<p>ひとつめ</p><p>ふたつめ</p>')).toBe('ひとつめ ふたつめ');
  });

  it('HTML エンティティをデコードする', () => {
    expect(extractPlainText('<p>赤ちゃん &amp; ママ</p>')).toBe('赤ちゃん & ママ');
  });

  it('script / style は除去する', () => {
    expect(
      extractPlainText('<style>p{color:red}</style><p>本文</p><script>alert(1)</script>'),
    ).toBe('本文');
  });
});

describe('buildExcerpt', () => {
  it('短い本文はそのまま返す', () => {
    expect(buildExcerpt('<p>短い抜粋</p>')).toBe('短い抜粋');
  });

  it('長い本文は maxLength に収まるよう切り、末尾に … を付ける', () => {
    const longText = 'あ'.repeat(200);
    const excerpt = buildExcerpt(`<p>${longText}</p>`, 50);

    expect(excerpt).toHaveLength(50);
    expect(excerpt.endsWith('…')).toBe(true);
  });

  it('maxLength ちょうどの長さは切り詰めない', () => {
    const text = 'あ'.repeat(110);
    expect(buildExcerpt(`<p>${text}</p>`)).toBe(text);
  });
});
