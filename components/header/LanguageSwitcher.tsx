'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

interface Language {
  code: string;
  label: string;
}

const languages: Language[] = [
  { code: 'en', label: 'ENG' },
  { code: 'es', label: 'ESP' },
];

interface LanguageSwitcherProps {
  className?: string;
  onLanguageChange?: () => void;
}

export default function LanguageSwitcher({ className = '', onLanguageChange }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    onLanguageChange?.();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => handleLanguageChange(lang.code)}
          className={`cursor-pointer px-3 py-1 text-sm rounded-md transition-all ${
            locale === lang.code
              ? 'bg-white text-black font-medium'
              : 'text-white/60 hover:text-white hover:bg-white/10'
          }`}
        >
          {lang.label}
        </button>
      ))}
    </div>
  );
}
