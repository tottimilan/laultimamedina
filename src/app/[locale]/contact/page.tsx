import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ContactPage from '@/components/pages/institutional/ContactPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'contact' });
  
  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
    locale: locale as Locale,
    path: '/contact',
  });
}

export default function Contact() {
  return <ContactPage />;
}

