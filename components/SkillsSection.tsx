'use client';

import { useTranslations } from 'next-intl';
import { Skill } from '@/types';
import SectionTitle from './SectionTitle';
import Container from './Container';

interface SkillsSectionProps {
  skills: Skill[];
}

export default function SkillsSection({ skills }: SkillsSectionProps) {
  const t = useTranslations('sections');

  return (
    <section id="skills" className="py-12">
      <Container>
        <SectionTitle>{t('skills')}</SectionTitle>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="p-3 md:p-4 border border-white/10 rounded-lg bg-white/5 hover:bg-white/10 transition-all"
            >
              <p className="text-xs md:text-base">{skill.name}</p>
              {skill.category && (
                <span className="text-[10px] md:text-xs text-white/60 mt-1 inline-block">
                  {skill.category}
                </span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
