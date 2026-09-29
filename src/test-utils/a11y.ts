import axe from 'axe-core';
import { expect } from 'vitest';

/**
 * axe-core でコンテナ内のアクセシビリティ違反がないことを検証する。
 *
 * jsdom では color-contrast ルールが正しく動かないため無効化している。
 * 違反がある場合は、ルールごとの説明と違反ノードの HTML を含む
 * メッセージでアサーションを失敗させる。
 *
 * 実行コストが高いため、1 テストあたり 1 回程度の利用に留めること。
 */
export async function expectNoA11yViolations(container: HTMLElement): Promise<void> {
  const results = await axe.run(container, {
    rules: { 'color-contrast': { enabled: false } },
  });

  const details = results.violations.map((violation) => {
    const nodes = violation.nodes.map((node) => `    - ${node.html}`).join('\n');
    return `  [${violation.id}] ${violation.help}\n${nodes}\n    詳細: ${violation.helpUrl}`;
  });

  expect(
    results.violations,
    details.length > 0 ? `a11y violations:\n${details.join('\n')}` : 'a11y violations',
  ).toEqual([]);
}
