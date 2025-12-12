'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/routing';
import { NavLink } from '@/types';
import HamburgerIcon from './HamburgerIcon';
import Container from './Container';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useNavUnderline } from '@/hooks/useNavUnderline';
import { NAV_SECTIONS } from '@/constants/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const t = useTranslations('navigation');
  const tHeader = useTranslations('header');
  const locale = useLocale();
  const router = useRouter();
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
    // Otherwise, let default navigation happen (goes to home page with hash)
  };

  // Detect scroll to toggle header background
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 80); // Header height is 80px (h-20)
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const languages = [
    { code: 'en', label: 'En' },
    { code: 'es', label: 'Es' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 h-20 transition-all duration-300 ${
          isScrolled ? 'backdrop-blur-lg bg-black/50 border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <Container className="h-full flex items-center justify-between">
          {/* Logo/Name */}
          <Link
            href="/"
            className="text-xl font-light md:font-bold font-mono md:font-sans hover:opacity-80 transition-opacity"
          >
            {tHeader('logo')}
          </Link>

          {/* Desktop Navigation Links */}
          <nav ref={navRef} className="hidden md:flex items-center relative">
            {navLinks.map((link) => {
              const sectionId = link.href.split('#')[1];
              return (
                <a
                  key={link.href}
                  href={link.href}
                  data-section={sectionId}
                  onClick={(e) => handleNavClick(e, sectionId)}
                  className="text-sm transition-opacity hover:opacity-80 p-4"
                >
                  {link.label}
                </a>
              );
            })}
            {/* Animated underline - only on home page */}
            {isHomePage && underlinePosition && (
              <span
                className="absolute bottom-0 h-0.5 bg-white transition-all duration-300 ease-out"
                style={{
                  left: `${underlinePosition.left}px`,
                  width: `${underlinePosition.width}px`,
                }}
              />
            )}
          </nav>

          {/* Right Side: Language Selector (Desktop) + Hamburger (Mobile) */}
          <div className="flex items-center gap-4">
            {/* Language Selector - Desktop Only */}
            <div className="hidden md:flex items-center gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`cursor-pointer px-3 py-1 text-sm rounded-md transition-all ${
                    locale === lang.code
                      ? 'bg-white text-black font-medium'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>

            {/* Hamburger Menu Button (Mobile Only) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-md transition-all text-white"
              aria-label={tHeader('toggleMenu')}
            >
              <HamburgerIcon isOpen={mobileMenuOpen} />
            </button>
          </div>
        </Container>
      </header>

      {/* Mobile Menu Overlay & Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div
            className="md:hidden fixed inset-0 top-20 z-30 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Mobile Menu */}
          <div className="md:hidden fixed top-20 left-0 right-0 z-40 backdrop-blur-lg bg-black/50 border-b-2 border-white/30 shadow-2xl animate-slideDown">
            <Container as="nav" className="flex flex-col py-6">
              {/* Navigation Links */}
              {navLinks.map((link) => {
                const sectionId = link.href.split('#')[1];
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, sectionId);
                      handleMobileLinkClick();
                    }}
                    className={`py-4 text-lg transition-colors border-b border-white/10 ${
                      activeSection === sectionId
                        ? 'text-white font-medium'
                        : 'text-white/60 hover:text-white/80'
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}

              {/* Language Selector - Mobile Only */}
              <div className="py-6 border-t border-white/10 mt-4">
                <p className="text-sm text-white/60 mb-3">{tHeader('languageLabel')}</p>
                <div className="flex items-center gap-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        handleLanguageChange(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`cursor-pointer px-4 py-2 text-sm rounded-md transition-all ${
                        locale === lang.code
                          ? 'bg-white text-black font-medium'
                          : 'text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </Container>
          </div>
        </>
      )}
    </>
  );
}
