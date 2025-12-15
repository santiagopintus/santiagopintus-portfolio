import type { Metadata } from 'next';
import { Open_Sans, Fira_Code } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@/lib/fontawesome';
import { Locales } from '@/i18n/request';
import CursorGradient from '@/components/CursorGradient';

// Prevent Font Awesome from auto-adding CSS
config.autoAddCss = false;

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locales)) {
    notFound();
  }

  // Providing all messages to the client side
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <link rel="icon" href="./icon.png" />
      </head>
      <body className={`${openSans.variable} ${firaCode.variable} antialiased`}>
        <CursorGradient />
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
