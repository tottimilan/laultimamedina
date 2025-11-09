import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ReadHub from '@/components/pages/ReadHub';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

/**
 * Hub de artículos y publicaciones (/read)
 */

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'read' });
  
  return generatePageMetadata({
    title: t('title'),
    description: t('subtitle'),
    locale: locale as Locale,
    path: '/read',
  });
}

interface ReadPageProps {
  searchParams: {
    type?: string;
    topic?: string;
    series?: string;
    sort?: string;
    page?: string;
  };
}

export default function ReadPage({ searchParams }: ReadPageProps) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ReadHub searchParams={searchParams} />
    </Suspense>
  );
}

