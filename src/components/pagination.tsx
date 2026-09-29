import type { ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath: string;
};

const linkClasses =
  'inline-flex items-center gap-1 text-small text-accent-strong transition-colors hover:text-accent';

function pageHref(basePath: string, page: number): string {
  if (page <= 1) {
    return basePath;
  }

  return `${basePath}page/${page}/`;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps): ReactNode {
  return (
    <nav aria-label="ページ送り" className={cn('flex items-center justify-center gap-6')}>
      {currentPage > 1 && (
        <a href={pageHref(basePath, currentPage - 1)} className={cn(linkClasses)}>
          <ArrowLeft size={16} aria-hidden="true" />
          前のページ
        </a>
      )}
      <span aria-current="page" className={cn('text-small text-text-subtle')}>
        {currentPage} / {totalPages}
      </span>
      {currentPage < totalPages && (
        <a href={pageHref(basePath, currentPage + 1)} className={cn(linkClasses)}>
          次のページ
          <ArrowRight size={16} aria-hidden="true" />
        </a>
      )}
    </nav>
  );
}
