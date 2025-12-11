import { notFound } from 'next/navigation';
import ProjectDetails from '@/components/ProjectDetails';
import { Project } from '@/types';
import fs from 'fs';
import path from 'path';

// Read projects from JSON file
function getProjects(locale: string): Project[] {
  const filePath = path.join(process.cwd(), 'public', 'mock-data', locale, 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

// Get a single project by id
function getProject(id: string, locale: string): Project | null {
  const projects = getProjects(locale);
  return projects.find((p) => p.id === id) || null;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const locales = ['en', 'es'];

  // Generate params for each project in each locale
  return locales.flatMap((locale) => {
    const projects = getProjects(locale);
    return projects.map((project) => ({
      locale,
      id: project.id,
    }));
  });
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const project = getProject(id, locale);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.shortTitle} - Santiago Pintus`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const project = getProject(id, locale);

  if (!project) {
    notFound();
  }

  return <ProjectDetails project={project} />;
}
