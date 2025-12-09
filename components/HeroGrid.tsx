'use client';

import { useTranslations } from 'next-intl';
import Arrow from './Arrow';
import Container from './Container';

const HeroStyledH1 = ({ children }: { children: React.ReactNode }) => (
  <h1
    className="text-[10vw] md:text-[7vw]  font-bold font-mono leading-tight"
    style={{
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    }}
  >
    {children}
  </h1>
);

const HeroGrid = () => {
  const t = useTranslations('hero');

  return (
    <section className="py-6 md:py-12">
      <Container className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8">
        {/* Top Left - "Full-stack" - 7/12 columns */}
        <div className="order-1 md:col-span-7 rounded-2xl flex items-center justify-start">
          <HeroStyledH1>{t('title1')}</HeroStyledH1>
        </div>

        {/* Top Right - Projects CTA Button - 5/12 columns */}
        <div className="order-3 md:order-2 md:col-span-5 rounded-2xl flex items-center justify-center">
          <a href="#projects" style={{ width: '50%' }}>
            <button
              className="group w-full flex items-center justify-center gap-4 bg-white text-black px-8 py-4 rounded-full hover:gap-6 transition-all cursor-pointer"
              style={{ transition: 'gap 0.3s ease' }}
            >
              <span className="text-xl">{t('cta')}</span>
              <Arrow />
            </button>
          </a>
        </div>

        {/* Bottom Left - Description - 5/12 columns */}
        <div className="order-4 md:order-3 md:col-span-5 rounded-2xl flex flex-col justify-center">
          <p className="text-base md:text-xl text-gray-400">
            {t.rich('description', {
              bold: (chunks) => <strong className="font-semibold text-white">{chunks}</strong>,
            })}
          </p>
        </div>

        {/* Bottom Right - "Developer" - 7/12 columns */}
        <div className="order-2 md:order-4 md:col-span-7 rounded-2xl flex items-start justify-end">
          <HeroStyledH1>{t('title2')}</HeroStyledH1>
        </div>
      </Container>
    </section>
  );
};

export default HeroGrid;
