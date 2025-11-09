import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import CareersPage from '@/components/pages/CareersPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'careers' });
  
  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
    locale: locale as Locale,
    path: '/careers',
  });
}

export default function Careers() {
  return <CareersPage />;
}

