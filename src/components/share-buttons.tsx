import type { ReactNode } from 'react';
import { MessageCircle, Share2 } from 'lucide-react';
import { cn } from '@/lib/cn';

export type ShareButtonsProps = {
  url: string;
  title: string;
  className?: string;
};

const linkClasses =
  'inline-flex items-center gap-2 rounded-md border border-border px-4 py-2 text-small transition-colors hover:bg-surface';

export function ShareButtons({ url, title, className }: ShareButtonsProps): ReactNode {
  const xHref = `https://x.com/intent/post?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const lineHref = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

  return (
    <div
      aria-label="この記事をシェア"
      role="group"
      className={cn('flex flex-wrap gap-3', className)}
    >
      <a href={xHref} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        <Share2 size={16} aria-hidden={true} />
        X でシェア
      </a>
      <a href={lineHref} target="_blank" rel="noopener noreferrer" className={linkClasses}>
        <MessageCircle size={16} aria-hidden={true} />
        LINE でシェア
      </a>
    </div>
  );
}
