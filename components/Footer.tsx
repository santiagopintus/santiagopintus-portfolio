'use client'

import { useTranslations } from 'next-intl'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faLinkedin,
  faTelegram,
} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faStar } from '@fortawesome/free-solid-svg-icons'
import { SocialLink } from '@/types'

interface FooterProps {
  socialLinks: SocialLink[]
}

const iconMap = {
  faGithub,
  faLinkedin,
  faTelegram,
}

export default function Footer({ socialLinks }: FooterProps) {
  const t = useTranslations('footer')

  return (
    <footer className="border-t border-white/10 bg-black/50 backdrop-blur-lg mt-20">
      <div className="px-8 md:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{t('contact')}</h3>
            <div className="space-y-3 text-gray-400">
              <a
                href="mailto:santiagopintus@gmail.com"
                className="flex items-center gap-3 hover:text-white transition-colors"
              >
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                <span>santiagopintus@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Social</h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link) => {
                const icon = iconMap[link.icon as keyof typeof iconMap]
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white/10 hover:border-white/40 transition-all"
                    aria-label={link.displayName}
                  >
                    <FontAwesomeIcon icon={icon} className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Santiago Pintus</h3>
            <p className="text-gray-400">
              Full-stack Developer specializing in React, Next.js, and modern web technologies.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
          <p>{t('copyright')}</p>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center">
            <p>
              {t('developedBy')}{' '}
              <a
                href="https://santiagopintus.com"
                className="text-white hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Santiago Pintus
              </a>
            </p>
            <p className="flex items-center gap-2">
              {t('openSource')}{' '}
              <a
                href="https://github.com/santiagopintus/santiagopintus-portfolio"
                className="text-white hover:underline inline-flex items-center gap-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t('github')}
                <FontAwesomeIcon icon={faStar} className="w-3 h-3" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
