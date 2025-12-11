'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import Arrow from './Arrow';
import { Project } from '@/types';
import { useState } from 'react';

interface ProjectCardProps {
  project: Project;
  priority?: boolean; // For LCP optimization on first card
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const t = useTranslations('buttons');
  const [imageHovering, setImageHovering] = useState(false);

  // Get the first screenshot or use a fallback
  const screenshot = project.screenshots?.[0];

  return (
    <div className="min-w-[280px] w-[calc(100vw-4rem)] md:w-full bg-linear-to-br rounded-[56px] md:rounded-4xl overflow-hidden shrink-0 snap-center relative border border-white/20">
      {/* Project Image */}
      <Link href={`/projects/${project.id}`} aria-label={`${t('readMore')} about ${project.title}`}>
        <div className="aspect-7/8 md:aspect-2/1 relative bg-linear-to-br from-gray-800 to-gray-900">
          {screenshot ? (
            <Image
              src={screenshot.url}
              alt={screenshot.altText || project.title}
              fill
              priority={priority}
              className="object-cover object-top-left"
              sizes="(max-width: 768px) 100vw, 400px"
              onMouseEnter={() => setImageHovering(true)}
              onMouseLeave={() => setImageHovering(false)}
            />
          ) : (
            // Fallback gradient if no image
            <div className="h-full bg-linear-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
            </div>
          )}
        </div>
      </Link>

      {/* Transparent overlay - brings content back when hovered */}
      {imageHovering && (
        <div
          className="absolute right-0 bottom-0 md:bottom-auto md:top-0 w-full md:w-2/3 h-2/3 md:h-full pointer-events-auto z-10"
          onMouseEnter={() => setImageHovering(false)}
        />
      )}

      {/* Content */}
      <div
        className={`p-5 absolute right-0 bottom-0 md:bottom-auto md:top-0 w-full md:w-2/3 h-2/3 md:h-full bg-dark-bg ${imageHovering ? 'md:translate-x-full' : 'md:translate-x-0'} md:border-l border-white/20 transition-transform duration-600`}
      >
        <h3 className="text-2xl mb-2 font-mono line-clamp-1">{project.shortTitle}</h3>
        <p className="text-white mb-4 line-clamp-3 lg:line-clamp-4 text-sm">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="text-xs px-3 py-1 bg-white/10 rounded-full">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-xs px-3 py-1 bg-white/10 rounded-full">
              +{project.technologies.length - 3}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {/* Read More - Link to project details */}
          <Link
            href={`/projects/${project.id}`}
            aria-label={`${t('readMore')} about ${project.title}`}
            className="group flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full hover:gap-4 transition-all"
          >
            <span>{t('readMore')}</span>
            <Arrow className="w-4 h-4" />
          </Link>

          {/* Visit Project - External link */}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t('visitProject')} - ${project.title}`}
              className="group flex items-center justify-center w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/20 hover:border-white/30"
            >
              <Arrow className="w-4 h-4 -rotate-45" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
