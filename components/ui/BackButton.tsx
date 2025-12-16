'use client';

import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Arrow from './Arrow';

interface BackButtonProps {
  href?: string;
  label?: string;
}

export default function BackButton({ href, label = 'Back' }: BackButtonProps) {
  const router = useRouter();

  if (href) {
    return (
      <Link
        href={href}
        aria-label={label}
        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
      >
        <Arrow className="w-4 h-4 rotate-180" />
        <span className="font-medium">{label}</span>
      </Link>
    );
  }

  return (
    <button
      onClick={() => router.back()}
      aria-label={label}
      className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-all shadow-lg hover:shadow-xl"
    >
      <Arrow className="w-4 h-4 rotate-180" />
      <span className="font-medium">{label}</span>
    </button>
  );
}
