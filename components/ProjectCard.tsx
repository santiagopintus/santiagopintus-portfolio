'use client';

import { useTranslations } from 'next-intl';
import Arrow from './Arrow';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
}

const gradients = [
  'from-purple-500/20 to-blue-500/20',
  'from-pink-500/20 to-orange-500/20',
  'from-green-500/20 to-teal-500/20',
  'from-blue-500/20 to-cyan-500/20',
];

export default function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('buttons');
  const gradientIndex = parseInt(project.id) % gradients.length;
  const gradient = gradients[gradientIndex];

  return (
    <div
      className={`min-w-[280px] w-[calc(100vw-4rem)] md:w-full bg-linear-to-br ${gradient} rounded-2xl overflow-hidden border border-white/10 shrink-0 snap-center`}
    >
      {/* Gradient Image Placeholder */}
      <div className="h-64 bg-linear-to-br from-purple-400 via-pink-400 to-blue-400 relative flex items-center justify-center">
        <div className="w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 line-clamp-2">{project.description}</p>

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
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-6 py-2 bg-white text-black rounded-full hover:gap-4 transition-all"
            >
              <span>{t('readMore')}</span>
              <Arrow className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
