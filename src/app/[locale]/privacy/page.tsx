import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PrivacyPage from '@/components/pages/institutional/PrivacyPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy',
    description: locale === 'es' 
      ? 'Nuestra política de privacidad y cómo protegemos tus datos'
      : 'Our privacy policy and how we protect your data',
    locale: locale as Locale,
    path: '/privacy',
  });
}

export default function Privacy() {
  return <PrivacyPage />;
}

