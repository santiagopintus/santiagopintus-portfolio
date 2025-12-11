'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Project } from '@/types';
import Arrow from './Arrow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import Container from './Container';

interface ProjectDetailsProps {
  project: Project;
}

export default function ProjectDetails({ project }: ProjectDetailsProps) {
  const t = useTranslations('buttons');
  const screenshot = project.screenshots?.[0];

  return (
    <section className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Side - Image Gallery */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 p-8">
                {/* Main Screenshot */}
                <div className="aspect-[4/3] rounded-2xl relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                  {screenshot ? (
                    <Image
                      src={screenshot.url}
                      alt={screenshot.altText || project.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    // Fallback if no image
                    <div className="h-full bg-linear-to-br from-purple-400 via-pink-400 to-blue-400 flex items-center justify-center">
                      <div className="w-32 h-32 bg-white/20 rounded-full blur-3xl"></div>
                      <p className="absolute text-white/60 text-sm">Screenshot placeholder</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Project Info */}
          <div className="space-y-8">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold">{project.title}</h1>

            {/* Technology Tags */}
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm bg-white/10 hover:bg-white/15 border border-white/20 rounded-full transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p className="text-lg">{project.description}</p>
              {project.longDescription && (
                <p className="text-base">{project.longDescription}</p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              {/* GitHub Button */}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View source code for ${project.title} on GitHub`}
                  className="group flex items-center justify-center w-14 h-14 bg-white text-black hover:bg-white/90 rounded-full transition-all shadow-lg hover:shadow-xl"
                  title="View on GitHub"
                >
                  <FontAwesomeIcon icon={faGithub} className="w-6 h-6" />
                </a>
              )}

              {/* Live Project Button */}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit live version of ${project.title}`}
                  className="group flex items-center justify-center w-14 h-14 bg-white text-black hover:bg-white/90 rounded-full transition-all shadow-lg hover:shadow-xl"
                  title="Visit live project"
                >
                  <Arrow className="w-5 h-5 -rotate-45" />
                </a>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
