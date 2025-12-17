'use client';

import { useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { NavLink } from '@/types';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useNavUnderline } from '@/hooks/useNavUnderline';
import { NAV_SECTIONS } from '@/components/header/navigation';

interface NavigationProps {
  onLinkClick?: (sectionId: string) => void;
  className?: string;
  showUnderline?: boolean;
  isFooterNav?: boolean;
}

export default function Navigation({
  onLinkClick,
  className = '',
  showUnderline = true,
}: NavigationProps) {
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();

  // Navigation links configuration - generated from NAV_SECTIONS constant
  const navLinks: NavLink[] = NAV_SECTIONS.map((section) => ({
    label: t(section),
    href: `/${locale}#${section}`,
  }));

  // Check if we're on the home page
  const isHomePage = pathname === '/';

  // Scroll-spy navigation - only enabled on home page
  const navRef = useRef<HTMLElement>(null);
  const { activeSection, setActiveSection } = useScrollSpy(isHomePage ? NAV_SECTIONS : []);
  const underlinePosition = useNavUnderline(isHomePage ? activeSection : null, navRef);

  // Handle nav link click - immediate underline feedback and smooth scroll
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    setActiveSection(sectionId);

    // If on home page, prevent navigation and scroll smoothly
    if (isHomePage) {
      e.preventDefault();
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = 80; // h-20 = 80px
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
      }
    }

    // Call optional callback
    onLinkClick?.(sectionId);
  };

  return (
    <nav
      ref={navRef}
      className={`flex justify-between md:justify-start items-center relative ${className}`}
    >
      {navLinks.map((link) => {
        const sectionId = link.href.split('#')[1];
        const ariaLabel = `Navigate to ${link.label} section`;
        const title = `Jump to ${link.label}`;
        return (
          <a
            key={link.href}
            href={link.href}
            data-section={sectionId}
            onClick={(e) => handleNavClick(e, sectionId)}
            className="text-sm transition-opacity hover:opacity-80 p-2 md:p-4"
            aria-label={ariaLabel}
            title={title}
          >
            {link.label}
          </a>
        );
      })}
      {/* Animated underline - only on home page */}
      {showUnderline && isHomePage && underlinePosition && (
        <span
          className="absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-out"
          style={{
            left: `${underlinePosition.left}px`,
            width: `${underlinePosition.width}px`,
          }}
        />
      )}
    </nav>
  );
}
