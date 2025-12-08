import Header from '@/components/Header'
import HeroGrid from '@/components/HeroGrid'
import SocialLinks from '@/components/SocialLinks'
import SkillsSection from '@/components/SkillsSection'
import ProjectsCarousel from '@/components/ProjectsCarousel'
import ExperienceTimeline from '@/components/ExperienceTimeline'
import Footer from '@/components/Footer'
import { SocialLink, Skill, Project, Experience, Education } from '@/types'

// Import mock data (in a real app, this would be from API)
async function getSocialLinks(): Promise<SocialLink[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/socials.json`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    // Fallback to reading from file system in development
    const fs = await import('fs/promises')
    const path = await import('path')
    const filePath = path.join(process.cwd(), 'public/mock-data/socials.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  }
  return res.json()
}

async function getSkills(): Promise<Skill[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/skills.json`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    const fs = await import('fs/promises')
    const path = await import('path')
    const filePath = path.join(process.cwd(), 'public/mock-data/skills.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  }
  return res.json()
}

async function getProjects(): Promise<Project[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/projects.json`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    const fs = await import('fs/promises')
    const path = await import('path')
    const filePath = path.join(process.cwd(), 'public/mock-data/projects.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  }
  return res.json()
}

async function getExperience(): Promise<Experience[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/experience.json`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    const fs = await import('fs/promises')
    const path = await import('path')
    const filePath = path.join(process.cwd(), 'public/mock-data/experience.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  }
  return res.json()
}

async function getEducation(): Promise<Education[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/mock-data/education.json`,
    { cache: 'no-store' }
  )
  if (!res.ok) {
    const fs = await import('fs/promises')
    const path = await import('path')
    const filePath = path.join(process.cwd(), 'public/mock-data/education.json')
    const data = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(data)
  }
  return res.json()
}

export default async function Home() {
  const [socialLinks, skills, projects, experiences, education] = await Promise.all([
    getSocialLinks(),
    getSkills(),
    getProjects(),
    getExperience(),
    getEducation(),
  ])

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroGrid />
        <SocialLinks links={socialLinks} />
        <ProjectsCarousel projects={projects} />
        <SkillsSection skills={skills} />
        <ExperienceTimeline experiences={experiences} education={education} />
      </main>
      <Footer socialLinks={socialLinks} />
    </div>
  )
}
