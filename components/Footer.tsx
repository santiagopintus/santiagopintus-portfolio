'use client';

import { useTranslations } from 'next-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faLinkedin,
  faTelegram,
  faFacebook,
  faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons';
import { SocialLink } from '@/types';
import Container from './Container';
import SectionTitle from './SectionTitle';
import Navigation from './Navigation';
import Card from './ui/Card';

interface FooterProps {
  socialLinks: SocialLink[];
}

const iconMap = {
  faGithub,
  faLinkedin,
  faTelegram,
  faFacebook,
  faInstagram,
  faEnvelope,
};

const FooterStyledH2 = ({
  customStyles,
  children,
}: {
  customStyles?: string;
  children: React.ReactNode;
}) => (
  <h2
    className={`text-[10vw] md:text-[7vw]  font-bold font-mono leading-tight ${customStyles}`}
    style={{
      textShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
    }}
  >
    {children}
  </h2>
);

export default function Footer({ socialLinks }: FooterProps) {
  const t = useTranslations('footer');

  // Add email to social links if not present
  const allSocialLinks = [
    ...socialLinks,
    {
      id: 'email',
      platform: 'email',
      displayName: 'Email',
      url: 'mailto:santiagopintus@gmail.com',
      icon: 'faEnvelope',
      order: 99,
    },
  ];

  return (
    <footer id="contact" className="border-t border-white/10 bg-black/50 backdrop-blur-lg mt-20">
      <Container as="div" className="py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Left Side: Large Name - Hidden on mobile, shown on desktop */}
          <div className="hidden lg:flex flex-col">
            <FooterStyledH2>Santiago</FooterStyledH2>
            <FooterStyledH2>Pintus</FooterStyledH2>
            <p className="text-white/60 mt-4">{t('jobTitle')}</p>
          </div>

          {/* Right Side: Contact Section */}
          <div className="flex flex-col">
            {/* Navigation Links - reused from Header */}
            <Navigation className="flex-wrap mb-6" showUnderline={false} />

            {/* Site Info Card */}
            <Card
              title={t('siteTitle')}
              customStyles="mb-6 lg:mb-0"
              cardBody={
                <>
                  <p>{t('handcrafted')}</p>
                  <p>{t('designedBy')}</p>
                  <p>{t('poweredBy')}</p>
                </>
              }
            />

            {/* Mobile Name - Shown only on mobile */}
            <div className="lg:hidden mb-6">
              <FooterStyledH2>Santiago</FooterStyledH2>
              <FooterStyledH2 customStyles="text-right">Pintus</FooterStyledH2>
              <p className="text-white/60 mt-4">{t('jobTitle')}</p>
            </div>
          </div>
        </div>

        {/* Contact Title */}
        <SectionTitle className="mb-6">{t('contact')}</SectionTitle>
        {/* Full-width Social Contact Buttons - Centered */}
        <div className="flex justify-center mb-8">
          <div className="flex justify-center flex-wrap gap-4 w-full max-w-4xl">
            {allSocialLinks.map((link) => {
              const icon = iconMap[link.icon as keyof typeof iconMap];
              const ariaLabel = `Contact Santiago Pintus via ${link.displayName}${
                link.platform === 'email' ? ' - Send an email' : ` - Open ${link.displayName} profile`
              }`;
              const title = `${link.displayName}${link.platform === 'email' ? ' contact' : ' profile'}`;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target={link.platform !== 'email' ? '_blank' : undefined}
                  rel={link.platform !== 'email' ? 'noopener noreferrer' : undefined}
                  className="flex items-center justify-center gap-3 px-6 py-3 border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all"
                  aria-label={ariaLabel}
                  title={title}
                >
                  <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                  <span className="text-sm">{link.displayName}</span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Repository Fork Link */}
        <div className="pt-8 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>
            {t('openSource')}{' '}
            <a
              href="https://github.com/santiagopintus/santiagopintus-portfolio"
              className="text-blue-200 underline hover:text-white transition-colors inline-flex items-center gap-1"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Fork Santiago Pintus portfolio repository on GitHub and give it a star"
              title="View and fork the source code on GitHub"
            >
              {t('github')}
              <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
