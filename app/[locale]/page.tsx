import Header from '@/components/Header';
import HeroGrid from '@/components/HeroGrid';
import SocialLinks from '@/components/SocialLinks';
import SkillsSection from '@/components/SkillsSection';
import ProjectsCarousel from '@/components/ProjectsCarousel';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import Footer from '@/components/Footer';
import { SocialLink, Skill, Project, Experience, Education } from '@/types';

// Import mock data (in a real app, this would be from API)
async function getSocialLinks(locale: string): Promise<SocialLink[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/${locale}/socials.json`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    // Fallback to reading from file system in development
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public/mock-data', locale, 'socials.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return res.json();
}

async function getSkills(locale: string): Promise<Skill[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/${locale}/skills.json`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public/mock-data', locale, 'skills.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return res.json();
}

async function getProjects(locale: string): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/${locale}/projects.json`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public/mock-data', locale, 'projects.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return res.json();
}

async function getExperience(locale: string): Promise<Experience[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/${locale}/experience.json`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public/mock-data', locale, 'experience.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return res.json();
}

async function getEducation(locale: string): Promise<Education[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/${locale}/education.json`,
    { cache: 'no-store' }
  );
  if (!res.ok) {
    const fs = await import('fs/promises');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'public/mock-data', locale, 'education.json');
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  }
  return res.json();
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const [socialLinks, skills, projects, experiences, education] = await Promise.all([
    getSocialLinks(locale),
    getSkills(locale),
    getProjects(locale),
    getExperience(locale),
    getEducation(locale),
  ]);

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroGrid />
        <SocialLinks links={socialLinks} />
        <ProjectsCarousel projects={projects} />
        <ExperienceTimeline experiences={experiences} education={education} />
        <SkillsSection skills={skills} />
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
}
