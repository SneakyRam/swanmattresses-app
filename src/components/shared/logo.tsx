'use client';

import Link from 'next/link';
import Image from 'next/image';
import { BRAND_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export default function Logo({
  className,
  width = 150,
  height = 40,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'inline-block focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm',
        className
      )}
      aria-label={`${BRAND_NAME} homepage`}
    >
      <Image
        src="/logo.svg"
        alt={`${BRAND_NAME} logo`}
        width={width}
        height={height}
        className="h-auto"
        priority
      />
    </Link>
  );
}
