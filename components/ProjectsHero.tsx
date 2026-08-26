import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Arrow from './ui/Arrow';

interface HeroLink {
  label: string;
  href: string;
  icon?: IconDefinition;
  external?: boolean;
}

const links: HeroLink[] = [
  {
    label: 'Github',
    href: 'https://github.com/santiagopintus',
    icon: faGithub,
    external: true,
  },
  {
    label: 'Linkedin',
    href: 'https://www.linkedin.com/in/santiagopintus/',
    icon: faLinkedin,
    external: true,
  },
  {
    label: 'Portfolio',
    href: '/',
  },
];

export default function ProjectsHero() {
  return (
    <div className="mb-16 space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold">Santiago Pintus Highlights</h1>

      <div className="flex flex-wrap gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel={link.external ? 'noopener noreferrer' : undefined}
            className="group flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:border-white/60 hover:bg-white/5 transition-all"
          >
            {link.icon && <FontAwesomeIcon icon={link.icon} className="w-5 h-5" />}
            <span>{link.label}</span>
            {!link.external && (
              <Arrow className="w-4 h-4 -rotate-45 transition-transform group-hover:translate-x-0.5" />
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
