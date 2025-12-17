import Header from '@/components/header';
import Footer from '@/components/Footer';
import { SocialLink } from '@/types';
import fs from 'fs';
import path from 'path';

async function getSocialLinks(): Promise<SocialLink[]> {
  const filePath = path.join(process.cwd(), 'public', 'mock-data', 'en', 'socials.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContents);
}

export default async function ProjectsLayout({ children }: { children: React.ReactNode }) {
  const socialLinks = await getSocialLinks();

  return (
    <div className="min-h-screen">
      <Header />
      <main>{children}</main>
      <Footer socialLinks={socialLinks} />
    </div>
  );
}
