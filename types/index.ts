export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  id: string;
  platform: string;
  displayName: string;
  url: string;
  icon: string;
  order: number;
}

export interface Project {
  id: string;
  shortTitle: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  screenshots: ProjectScreenshot[];
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProjectScreenshot {
  id?: string;
  projectId?: string;
  url: string;
  altText: string;
  aspectRatio?: string;
  order: number;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
  responsibilities: string[];
  technologies: string[];
  order: number;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate?: string | null;
  isCurrent: boolean;
  description: string;
  achievements: string[];
  order: number;
}

export interface Skill {
  id: string;
  name: string;
  category?: string;
  order: number;
}
