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
      title: tAbout('styles'),
      skills: ['Tailwind CSS', 'CSS3', 'SASS', 'PostCSS', 'Material UI', 'Styled Components'],
      className: 'p-6 bg-transparent border border-white/20 rounded-4xl',
    },
    {
      title: tAbout('backend'),
      skills: skillsByCategory['Backend'] || [],
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Skills Cards Column */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md aspect-square">
              <Image
                src="/images/santiago-pintus.jpeg"
                alt="Santiago Pintus"
                fill
                className="object-cover rounded-full"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
