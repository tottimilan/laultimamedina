import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import InfographicsHub from '@/components/pages/InfographicsHub';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Infografías' : locale === 'ar' ? 'الرسوم البيانية' : 'Infographics',
    description: locale === 'es'
      ? 'Infografías descargables sobre temas islámicos para compartir y aprender'
      : locale === 'ar'
      ? 'رسوم بيانية قابلة للتنزيل حول المواضيع الإسلامية للمشاركة والتعلم'
      : 'Downloadable infographics on Islamic topics to share and learn',
    locale: locale as Locale,
    path: '/infographics',
  });
}

export default function InfographicsPage({ searchParams }: { searchParams: Record<string, string> }) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <InfographicsHub searchParams={searchParams} />
    </Suspense>
  );
}

