import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import WatchHub from '@/components/pages/WatchHub';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'watch' });
  
  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
    locale: locale as Locale,
    path: '/watch',
  });
}

export default function WatchPage({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <WatchHub searchParams={searchParams} />
    </Suspense>
  );
}

