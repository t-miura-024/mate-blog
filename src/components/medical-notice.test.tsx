import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { expectNoA11yViolations } from '@/test-utils/a11y';
import { MedicalNotice } from './medical-notice';

describe('MedicalNotice', () => {
  it('固定文言を表示する', () => {
    render(<MedicalNotice />);

    expect(screen.getByRole('note')).toHaveTextContent(
      'この記事は個人の体験に基づく記録です。体調や健康の判断は、かかりつけの医療機関にご相談ください。',
    );
  });

  it('a11y 違反がない', async () => {
    const { container } = render(<MedicalNotice />);

    await expectNoA11yViolations(container);
  });
});
