import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Inter, Lora, Noto_Naskh_Arabic } from 'next/font/google';
import { notFound } from 'next/navigation';
import ClientProviders from '@/components/ClientProviders';
import ConsentManager from '@/components/ConsentManager';
import RegisterServiceWorker from '@/app/register-sw';
import { locales, rtlLocales, type Locale } from '@/i18n';
import type { Metadata } from 'next';

/**
 * Fuentes optimizadas con Next.js
 */
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const lora = Lora({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

const notoNaskhArabic = Noto_Naskh_Arabic({
  subsets: ['arabic'],
  variable: '--font-arabic',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const messages = await getMessages({ locale });
  const seoMessages = messages.seo as any;

  return {
    title: {
      default: seoMessages?.defaultTitle || 'La Última Medina',
      template: '%s | La Última Medina',
    },
    description: seoMessages?.defaultDescription || 'Conocimiento Islámico para Nuestro Tiempo',
    robots: {
      index: process.env.NODE_ENV === 'production',
      follow: process.env.NODE_ENV === 'production',
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Validar locale
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  const isRTL = rtlLocales.includes(locale as Locale);
  const fontClass = locale === 'ar' ? notoNaskhArabic.variable : inter.variable;

  return (
    <html lang={locale} dir={isRTL ? 'rtl' : 'ltr'}>
      <body className={`${fontClass} ${lora.variable} ${locale === 'ar' ? 'font-arabic' : 'font-sans'}`}>
        <a href="#main-content" className="skip-to-content">
          {locale === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
        </a>
        
        <ClientProviders>
          <NextIntlClientProvider messages={messages}>
            {children}
            <ConsentManager />
            <RegisterServiceWorker />
          </NextIntlClientProvider>
        </ClientProviders>
      </body>
    </html>
  );
}

