'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faTelegram,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { SocialLink } from '@/types';
import Container from './Container';

const iconMap: Record<string, IconDefinition> = {
  faGithub,
  faLinkedin,
  faTelegram,
  faFacebook,
  faInstagram,
};

interface SocialLinksProps {
  links: SocialLink[];
}

export default function SocialLinks({ links }: SocialLinksProps) {
  return (
    <section className="py-12">
      <Container className="flex flex-wrap gap-4 justify-center">
        {links.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-white/20 rounded-full hover:border-white/60 hover:bg-white/5 transition-all"
          >
            <FontAwesomeIcon icon={iconMap[link.icon] || faGithub} className="w-5 h-5" />
            <span>{link.displayName}</span>
          </a>
        ))}
      </Container>
    </section>
  );
}
