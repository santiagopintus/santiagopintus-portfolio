'use client';

import { useTranslations } from 'next-intl';
import { Experience, Education } from '@/types';
import { useEffect, useRef, useState } from 'react';
import SectionTitle from './SectionTitle';
import { formatDate } from '@/lib/helpers';
import Container from './Container';

interface ExperienceTimelineProps {
  experiences: Experience[];
  education: Education[];
}

type TimelineItem = {
  id: string;
  type: 'experience' | 'education';
  title: string;
  subtitle: string;
  location: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  description: string;
  details: string[];
  technologies?: string[];
};

export default function ExperienceTimeline({ experiences, education }: ExperienceTimelineProps) {
  const t = useTranslations();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [dotOpacity, setDotOpacity] = useState(0);

  // Combine and sort experiences and education
  const timelineItems: TimelineItem[] = [
    ...experiences.map((exp) => ({
      id: exp.id,
      type: 'experience' as const,
      title: exp.jobTitle,
      subtitle: exp.company,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate || null,
      isCurrent: exp.isCurrent,
      description: exp.description,
      details: exp.responsibilities,
      technologies: exp.technologies,
    })),
    ...education.map((edu) => ({
      id: edu.id,
      type: 'education' as const,
      title: edu.degree,
      subtitle: edu.institution,
      location: edu.location,
      startDate: edu.startDate,
      endDate: edu.endDate || null,
      isCurrent: edu.isCurrent,
      description: edu.description,
      details: edu.achievements,
    })),
  ].sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const section = sectionRef.current;
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top;
      const sectionBottom = sectionRect.bottom;
      const sectionHeight = sectionRect.height;
      const viewportCenter = window.innerHeight / 2;

      // Calculate how far the section has scrolled through the viewport
      // When section top is at viewport center, progress = 0
      // When section bottom is at viewport center, progress = 1
      const scrollProgress = (viewportCenter - sectionTop) / sectionHeight;

      // The dot should only be visible when the section is in view
      // It should be brightest when the middle of the section is at viewport center
      if (sectionTop > window.innerHeight || sectionBottom < 0) {
        // Section is completely out of view
        setDotOpacity(0);
      } else {
        // Calculate opacity based on distance from center
        // Maximum opacity when scrollProgress is around 0.5 (middle of section)
        const distanceFromCenter = Math.abs(scrollProgress - 0.5);
        const maxOpacity = 1;
        const minOpacity = 0;
        // Opacity decreases as we move away from center
        const opacity = Math.max(minOpacity, maxOpacity - distanceFromCenter * 2);
        setDotOpacity(Math.max(0, Math.min(1, opacity)));
      }
    };

    handleScroll(); // Initial call
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const formatExperienceDate = (date: string | null, isCurrent: boolean) => {
    if (isCurrent || !date) return t('experience.present');
    return formatDate(date);
  };

  return (
    <section id="experience" className="relative py-20">
      <Container>
        <SectionTitle spacing="large">
          {t('sections.experience')} & {t('sections.education')}
        </SectionTitle>

        <div className="relative max-w-6xl mx-auto">
        {/* Fixed Center Dot */}
        <div
          className="hidden md:block fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none transition-opacity duration-300"
          style={{ opacity: dotOpacity }}
        >
          <div className="w-6 h-6 bg-white rounded-full shadow-lg shadow-white/50"></div>
        </div>

        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-transparent via-white/30 to-transparent md:-translate-x-1/2"></div>

        {/* Timeline Items */}
        <div ref={sectionRef} className="space-y-12">
          {timelineItems.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={item.id}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'} pl-12 md:pl-0`}
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all">
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between flex-col md:flex-row gap-2">
                        <div className={isLeft ? 'md:order-2' : ''}>
                          <h3 className="text-2xl font-bold mb-1">{item.title}</h3>
                          <p className="text-lg text-gray-400 mb-1">{item.subtitle}</p>
                          <p className="text-sm text-gray-500">{item.location}</p>
                        </div>
                        <span
                          className={`text-sm px-3 py-1 rounded-full ${
                            item.type === 'experience'
                              ? 'bg-blue-500/20 text-blue-300'
                              : 'bg-purple-500/20 text-purple-300'
                          } ${isLeft ? 'md:order-1' : ''}`}
                        >
                          {formatExperienceDate(item.startDate, false)} -{' '}
                          {formatExperienceDate(item.endDate, item.isCurrent)}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4">{item.description}</p>

                    {/* Details */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-400 mb-2">
                        {item.type === 'experience'
                          ? t('experience.responsibilities')
                          : t('education.achievements')}
                      </h4>
                      <ul
                        className={`space-y-2 text-sm text-gray-400 ${
                          isLeft ? 'md:list-inside' : 'list-inside'
                        }`}
                      >
                        {item.details.map((detail, idx) => (
                          <li key={idx} className="leading-relaxed">
                            • {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Technologies */}
                    {item.technologies && (
                      <div className="flex flex-wrap gap-2">
                        {item.technologies.slice(0, 4).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-300"
                          >
                            {tech}
                          </span>
                        ))}
                        {item.technologies.length > 4 && (
                          <span className="text-xs px-3 py-1 bg-white/10 rounded-full text-gray-500">
                            +{item.technologies.length - 4}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Spacer for the other side on desktop */}
                <div className="flex-1 hidden md:block"></div>

                {/* Timeline Dot (Mobile Only - on the left) */}
                <div className="absolute left-4 top-6 -translate-x-1/2 md:hidden">
                  <div
                    className={`w-4 h-4 rounded-full ${
                      item.type === 'experience' ? 'bg-blue-500' : 'bg-purple-500'
                    }`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      </Container>
    </section>
  );
}
