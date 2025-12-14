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
  height = 50,
}: LogoProps) {
  return (
    <Link
      href="/"
      className={cn('relative inline-block', className)}
      aria-label={`${BRAND_NAME} homepage`}
    >
      <Image
        src="/logo.png"
        alt={`${BRAND_NAME} logo`}
        width={width}
        height={height}
        className="object-contain"
        priority
      />
    </Link>
  );
}
