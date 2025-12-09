'use client';

import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function HeroGrid() {
  const t = useTranslations('hero');

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 min-h-[60vh] px-4 md:px-16 py-6 md:py-12">
      {/* Top Left - "Full-stack" */}
      <div className="order-1 rounded-2xl md:p-8 flex items-end justify-start">
        <h1 className="text-5xl md:text-8xl font-bold font-mono">{t('title1')}</h1>
      </div>

      {/* Top Right - Projects CTA Button */}
      <div className="order-3 md:order-2 rounded-2xl md:p-8 flex items-center justify-center">
        <a href="#projects">
          <button className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full hover:gap-6 transition-all">
            <span className="text-xl">{t('cta')}</span>
            <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
          </button>
        </a>
      </div>

      {/* Bottom Left - Description */}
      <div className="order-4 md:order-3 rounded-2xl md:p-8 flex flex-col justify-center">
        <p className="text-base md:text-xl text-gray-400">{t('description')}</p>
      </div>

      {/* Bottom Right - "Developer" */}
      <div className="order-2 md:order-4 rounded-2xl md:p-8 flex items-start justify-end md:justify-end justify-start">
        <h1 className="text-5xl md:text-8xl font-bold font-mono">{t('title2')}</h1>
      </div>
    </section>
  );
}
