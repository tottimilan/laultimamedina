import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ListenHub from '@/components/pages/ListenHub';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'listen' });
  
  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
    locale: locale as Locale,
    path: '/listen',
  });
}

export default function ListenPage({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ListenHub searchParams={searchParams} />
    </Suspense>
  );
}

