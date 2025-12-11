import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import ProjectDetails from '@/components/ProjectDetails';
import { Project } from '@/types';
import fs from 'fs';
import path from 'path';

// Read projects from JSON file
function getProjects(): Project[] {
  const filePath = path.join(process.cwd(), 'public', 'mock-data', 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Get a single project by slug
function getProject(slug: string): Project | null {
  const projects = getProjects();
  return projects.find((p) => p.slug === slug) || null;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Santiago Pintus`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
