import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import DonatePage from '@/components/pages/DonatePage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'donate' });
  
  return generatePageMetadata({
    title: t('becomeASustainer'),
    description: t('subtitle'),
    locale: locale as Locale,
    path: '/sustain',
  });
}

export default function Sustain() {
  return <DonatePage type="monthly" />;
}

