import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Notice } from './notice';

export type MedicalNoticeProps = {
  className?: string;
};

export function MedicalNotice({ className }: MedicalNoticeProps): ReactNode {
  return (
    <Notice tone="accent" className={cn(className)}>
      この記事は個人の体験に基づく記録です。体調や健康の判断は、かかりつけの医療機関にご相談ください。
    </Notice>
  );
}
