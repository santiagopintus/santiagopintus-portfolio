'use client'

import { useRef } from 'react'
import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import ProjectCard from './ProjectCard'
import { Project } from '@/types'

interface ProjectsCarouselProps {
  projects: Project[]
}

export default function ProjectsCarousel({ projects }: ProjectsCarouselProps) {
  const t = useTranslations('sections')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const firstCard = container.querySelector('div') as HTMLElement
      const scrollAmount = firstCard ? firstCard.offsetWidth + 24 : 450 // card width + gap
      const newScrollPosition =
        container.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount)

      container.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      })
    }
  }

  return (
    <section id="projects" className="relative px-8 md:px-16 py-12">
      <h2 className="text-4xl font-bold mb-8">{t('projects')}</h2>

      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll('left')}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
          aria-label="Scroll left"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5" />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto flex gap-6 scrollbar-hide snap-x snap-mandatory pb-4"
        >
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll('right')}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 border border-white/20 rounded-full flex items-center justify-center hover:bg-white/10 transition-all"
          aria-label="Scroll right"
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5" />
        </button>
      </div>
    </section>
  )
}
