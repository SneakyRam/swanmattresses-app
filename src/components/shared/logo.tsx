'use client';

import Link from 'next/link';
import { BRAND_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  className,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'inline-block font-headline text-2xl font-bold tracking-tight',
        className
      )}
      aria-label={`${BRAND_NAME} homepage`}
    >
      {BRAND_NAME}
    </Link>
  );
}
