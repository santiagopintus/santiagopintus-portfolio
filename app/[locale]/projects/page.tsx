import fs from 'fs';
import path from 'path';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Container from '@/components/Container';
import ProjectsHero from '@/components/ProjectsHero';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import { Project } from '@/types';

export const metadata = {
  title: 'Highlights - Santiago Pintus',
  description: 'Santiago Pintus — project and experience highlights.',
};

function getProjectsMarkdown(): string {
  const filePath = path.join(process.cwd(), 'PROJECTS.md');
  return fs.readFileSync(filePath, 'utf8');
}

function getProjects(locale: string): Project[] {
  const filePath = path.join(process.cwd(), 'public', 'mock-data', locale, 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function ProjectsHighlightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = getProjectsMarkdown();
  const projects = getProjects(locale);

  return (
    <>
      <section className="pt-20">
        <Container>
          <ProjectsHero />
        </Container>
      </section>

      <ProjectsCarousel projects={projects} />

      <section className="pb-20">
        <Container>
          <article className="prose prose-invert max-w-none prose-headings:font-bold prose-a:text-white prose-a:no-underline hover:prose-a:underline prose-strong:text-white prose-hr:border-white/10 prose-li:marker:text-white/40">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {content}
            </ReactMarkdown>
          </article>
        </Container>
      </section>
    </>
  );
}
