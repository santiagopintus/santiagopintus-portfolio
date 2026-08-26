'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Skill } from '@/types';
import SectionTitle from './SectionTitle';
import Container from './Container';
import Card from './ui/Card';

interface SkillsSectionProps {
  skills: Skill[];
}

interface SkillCard {
  title: string;
  skills: string[];
  className: string;
  titleClassName?: string;
  showDescription?: boolean;
  isWhite?: boolean;
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const t = useTranslations('sections');
  const tAbout = useTranslations('about');

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      const category = skill.category || 'Other';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(skill.name);
      return acc;
    },
    {} as Record<string, string[]>
  );

  const languages = [
    { flag: 'https://flagcdn.io/flags/4x3/ar.svg', text: 'Hablo español!', badge: 'native' },
    { flag: 'https://flagcdn.io/flags/4x3/br.svg', text: 'Falo português!', badge: 'fluent' },
    { flag: 'https://flagcdn.io/flags/4x3/us.svg', text: 'I speak english!', badge: 'professional' },
  ];

  // Define card configuration in render order
  const cards: SkillCard[] = [
    {
      title: tAbout('frontend'),
      skills: skillsByCategory['Frontend'] || [],
      className: 'p-6 rounded-4xl',
      titleClassName: 'text-black text-xl mb-4',
      isWhite: true,
    },
    {
      title: tAbout('backend'),
      skills: skillsByCategory['Backend'] || [],
      className: 'p-6 bg-transparent border border-white/20 rounded-4xl',
    },
    {
      title: tAbout('styles'),
      skills: ['Tailwind CSS', 'CSS3', 'SASS', 'PostCSS', 'Material UI', 'Styled Components'],
      className: 'p-6 bg-transparent border border-white/20 rounded-4xl',
    },
    {
      title: tAbout('others'),
      skills: skillsByCategory['Other'] || [],
      className: 'p-6 bg-transparent border border-white/20 rounded-4xl',
      showDescription: true,
    },
  ];

  return (
    <section id="about" className="py-12">
      <Container>
        <SectionTitle>{t('about')}</SectionTitle>

        {/* Greeting and experience */}
        <div className="mb-8">
          <p className="text-lg md:text-xl">
            {tAbout.rich('greeting', {
              bold: (chunks) => <strong className="font-semibold text-white">{chunks}</strong>,
            })}
          </p>
        </div>

        {/* Main content: Skills cards on left, Image on right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Skills Cards Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            {cards.map((card) => (
              <Card
                title={card.title}
                key={card.title}
                isWhite={card.isWhite}
                cardBody={
                  <>
                    {card.showDescription ? (
                      <p className="text-sm text-white/70 italic mb-3">{tAbout('favoriteTech')}</p>
                    ) : undefined}
                    <p>{card.skills.join('  /  ')}</p>
                  </>
                }
              />
            ))}
          </div>

          {/* Image Column */}
          <div className="flex flex-col justify-between items-center lg:items-end h-full gap-4">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/santiago-pintus.jpeg"
                alt="Santiago Pintus"
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="flex flex-col gap-3 w-full max-w-md">
              {languages.map((lang) => (
                <div
                  key={lang.badge}
                  className="flex items-center justify-between gap-4 px-6 py-4 border border-white/20 rounded-4xl text-sm font-mono text-gray-400"
                >
                  <div className="flex items-center gap-3">
                    <img src={lang.flag} alt="" className="h-6 w-auto rounded-sm" />
                    <span>{lang.text}</span>
                  </div>
                  <span className="font-mono text-xs px-3 py-1 border border-white/20 rounded-full text-white/70 uppercase tracking-wide shrink-0">
                    {lang.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
