import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ExperienciasHub from '@/components/pages/ExperienciasHub';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Experiencias' : locale === 'ar' ? 'التجارب' : 'Experiences',
    description: locale === 'es'
      ? 'Rutas históricas por el legado islámico en España. Recorrer la historia es otra forma de recordarnos quiénes somos.'
      : locale === 'ar'
      ? 'جولات تاريخية في الإرث الإسلامي في إسبانيا. السير في التاريخ طريقة أخرى لتذكر من نحن.'
      : 'Historical tours through Islamic legacy in Spain. Walking through history is another way to remember who we are.',
    locale: locale as Locale,
    path: '/experiencias',
  });
}

export default function Experiencias() {
  return <ExperienciasHub />;
}

