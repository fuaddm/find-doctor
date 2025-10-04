import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '~/libs/cn';

export function SectionHeader({
  suptitle,
  title,
  subtitle,
  className = '',
  children,
}: {
  suptitle: string;
  title: string;
  subtitle: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn({
        'mx-auto flex max-w-[450px] flex-col items-center gap-5 text-center': true,
        [className]: true,
      })}
    >
      <div className="w-fit rounded-full border border-gray-200 px-3 py-1.5 text-sm font-medium">{suptitle}</div>
      <div className="mx-auto text-3xl font-medium md:text-4xl">{title}</div>
      <div className="mx-auto text-base text-gray-500 md:text-lg">{subtitle}</div>
      {children}
    </div>
  );
}
