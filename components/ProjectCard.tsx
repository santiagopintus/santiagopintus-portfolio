'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import Arrow from './ui/Arrow';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  priority?: boolean; // For LCP optimization on first card
}

export default function ProjectCard({ project, priority = false }: ProjectCardProps) {
  const t = useTranslations('buttons');

  // Get the first screenshot or use a fallback
  const screenshot = project.screenshots?.[0];

  return (
    <div className="min-w-[280px] w-[calc(100vw-4rem)] md:w-full bg-linear-to-br rounded-4xl overflow-hidden shrink-0 snap-center relative border border-white/20">
      {/* Project Image */}
      <Link
        href={`/projects/${project.id}`}
        aria-label={`View details about ${project.title} project`}
        title={`${project.title} - ${project.description.substring(0, 100)}...`}
      >
        <div className="aspect-7/8 md:aspect-2/1 relative bg-linear-to-br from-gray-800 to-gray-900">
          {screenshot ? (
            <Image
              src={screenshot.url}
              alt={screenshot.altText || project.title}
              fill
              priority={priority}
              className="object-cover object-top-left"
              sizes="(max-width: 768px) 100vw, 400px"
            />
          ) : (
            // Fallback gradient if no image
            <div className="h-full bg-linear-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-5 absolute right-0 bottom-0 md:bottom-auto md:top-0 w-full md:w-2/3 h-2/3 md:h-full bg-dark-bg/90 md:border-l border-white/20 flex flex-col justify-between">
        <div>
          <h3 className="text-2xl mb-2 font-mono line-clamp-1">{project.shortTitle}</h3>
          <p className="text-white mb-4 line-clamp-3 min-[1400px]:line-clamp-4 text-sm">
            {project.description}
          </p>
        </div>

        {/* CONTENT FOOTER */}
        <div>
          {/* Technologies */}
          <div className="flex flex-nowrap gap-2 mb-4">
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
              aria-label={`Read more about ${project.title} project - View full details and screenshots`}
              title={`Explore ${project.title} project`}
              className="group flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full hover:gap-4 transition-all"
            >
              <span>{t('projectCardBtnLabel')}</span>
              <Arrow className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
