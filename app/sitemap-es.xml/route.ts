import { promises as fs } from 'fs';
import path from 'path';

interface Project {
  id: string;
  [key: string]: string;
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const lastmod = '2025-12-15';

  // Read projects data
  const projectsPath = path.join(process.cwd(), 'public/mock-data/es/projects.json');
  const projectsData = await fs.readFile(projectsPath, 'utf-8');
  const projects: Project[] = JSON.parse(projectsData);

  // Generate hreflang links for a URL
  const generateHreflangs = (enUrl: string, esUrl: string) => `
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="es" href="${esUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />`;

  // Home page
  const homeUrl = `
  <url>
    <loc>${baseUrl}/es</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>${generateHreflangs(`${baseUrl}/en`, `${baseUrl}/es`)}
  </url>`;

  // Project pages
  const projectUrls = projects
    .map(
      (project) => `
  <url>
    <loc>${baseUrl}/es/projects/${project.id}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>${generateHreflangs(
      `${baseUrl}/en/projects/${project.id}`,
      `${baseUrl}/es/projects/${project.id}`
    )}
  </url>`
    )
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">${homeUrl}${projectUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
