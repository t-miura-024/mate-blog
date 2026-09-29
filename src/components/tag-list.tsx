import type { ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { Tag } from './tag';

export type TagListProps = {
  tags: { label: string; href: string }[];
  className?: string;
};

export function TagList({ tags, className }: TagListProps): ReactNode {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {tags.map((tag) => (
        <li key={tag.href}>
          <Tag href={tag.href}>{tag.label}</Tag>
        </li>
      ))}
    </ul>
  );
}
