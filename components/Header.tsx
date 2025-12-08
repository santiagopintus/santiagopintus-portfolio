'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useRouter, usePathname, Link } from '@/i18n/routing'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from '@/types'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = useTranslations('navigation')
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const navLinks: NavLink[] = [
    { label: t('about'), href: '#about' },
    { label: t('projects'), href: '#projects' },
    { label: t('articles'), href: '#articles' },
    { label: t('contact'), href: '#contact' },
  ]

  const languages = [
    { code: 'en', label: 'En' },
    { code: 'es', label: 'Es' },
  ]

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale })
  }

  const handleMobileLinkClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="sticky top-0 z-50 h-20 px-8 md:px-16 flex items-center justify-between backdrop-blur-lg bg-black/50 border-b border-white/10">
        {/* Logo/Name */}
        <Link href="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
          Santiago Pintus
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm hover:text-white/80 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Side: Language Selector + Hamburger */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="flex items-center gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-3 py-1 text-sm rounded-md transition-all ${
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
            className="md:hidden w-12 h-12 flex items-center justify-center hover:bg-white/10 rounded-md transition-all"
            aria-label="Toggle menu"
          >
            <FontAwesomeIcon icon={mobileMenuOpen ? faTimes : faBars} className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 left-0 right-0 z-40 backdrop-blur-lg bg-black/95 border-b border-white/10 animate-slideDown">
          <nav className="flex flex-col px-8 py-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleMobileLinkClick}
                className="py-4 text-lg hover:text-white/80 transition-colors border-b border-white/10 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  )
}
