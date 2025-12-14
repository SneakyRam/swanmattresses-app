import Link from 'next/link';
import { BRAND_NAME } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export default function Logo({ className }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        'font-headline text-xl font-bold tracking-tight text-primary transition-colors hover:text-primary/80',
        className
      )}
      aria-label={`${BRAND_NAME} homepage`}
    >
      {BRAND_NAME}
    </Link>
  );
}
