'use client';

import { useRef, useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from './ProjectCard';
import Arrow from './ui/Arrow';
import SectionTitle from './SectionTitle';
import { Project } from '@/types';
import Container from './Container';

interface ProjectsCarouselProps {
  projects: Project[];
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const t = useTranslations('sections');
  const tCarousel = useTranslations('projectsCarousel');
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('div') as HTMLElement;
      const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 380; // card width + gap
      const newScrollPosition =
        container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);

      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const firstCard = container.querySelector('div') as HTMLElement;
      const scrollAmount = firstCard ? (firstCard.offsetWidth + 24) * index : 380 * index;

      container.scrollTo({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const firstCard = container.querySelector('div') as HTMLElement;
      if (!firstCard) return;

      const cardWidth = firstCard.offsetWidth + 24;
      const index = Math.round(container.scrollLeft / cardWidth);
      setCurrentIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="projects" className="relative py-12">
      <Container>
        <SectionTitle>{t('projects')}</SectionTitle>

        <div className="relative">
          {/* Left Arrow - Desktop only */}
          <button
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            className="hidden md:flex cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 w-24 h-24 border border-white/20 rounded-full items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent active:bg-transparent"
            aria-label={tCarousel('scrollLeft')}
          >
            <Arrow direction="left" />
          </button>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto flex gap-6 scrollbar-hide snap-x snap-mandatory pb-4 md:px-[15%] lg:px-[20%] xl:px-[30%]"
          >
            {projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} priority={index === 0} />
            ))}
          </div>

          {/* Fade overlays - Desktop only */}
          <div className="hidden md:block absolute left-0 top-0 bottom-4 w-[30%] bg-linear-to-r from-dark-bg via-dark-bg/20 to-transparent pointer-events-none z-5"></div>
          <div className="hidden md:block absolute right-0 top-0 bottom-4 w-[30%] bg-linear-to-l from-dark-bg via-dark-bg/20 to-transparent pointer-events-none z-5"></div>

          {/* Right Arrow - Desktop only */}
          <button
            onClick={() => scroll('right')}
            disabled={currentIndex >= projects.length - 1}
            className="hidden md:flex cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 w-24 h-24 border border-white/20 rounded-full items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent active:bg-transparent"
            aria-label={tCarousel('scrollRight')}
          >
            <Arrow direction="right" />
          </button>
        </div>

        {/* Mobile Controls - Below carousel */}
        <div className="md:hidden relative flex items-center justify-between mt-2">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={currentIndex === 0}
            className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent active:bg-white/10 disabled:active:scale-100 disabled:active:bg-transparent"
            aria-label={tCarousel('scrollLeft')}
          >
            <Arrow direction="left" />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {projects.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToIndex(index)}
                className={`rounded-full transition-all ${
                  index === currentIndex ? 'w-2 h-2 bg-white' : 'w-2 h-2 bg-white/30'
                }`}
                aria-label={tCarousel('goToSlide', { slideNumber: index + 1 })}
              />
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={currentIndex >= projects.length - 1}
            className="w-24 h-24 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent active:bg-white/10 disabled:active:scale-100 disabled:active:bg-transparent"
            aria-label={tCarousel('scrollRight')}
          >
            <Arrow direction="right" />
          </button>
        </div>
      </Container>
    </section>
  );
}
