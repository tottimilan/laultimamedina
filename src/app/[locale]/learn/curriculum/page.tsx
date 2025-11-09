import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import CurriculumPage from '@/components/pages/learn/CurriculumPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Currículo Educativo' : locale === 'ar' ? 'المنهج التعليمي' : 'Educational Curriculum',
    description: locale === 'es'
      ? 'Planes de lecciones profundos sobre temas de fe específicamente diseñados para jóvenes musulmanes de hoy'
      : locale === 'ar'
      ? 'خطط دروس عميقة حول قضايا الإيمان مصممة خصيصًا للشباب المسلم اليوم'
      : 'Deep lesson plans on faith issues specifically tailored to Muslim youth today',
    locale: locale as Locale,
    path: '/learn/curriculum',
  });
}

export default function Curriculum() {
  return <CurriculumPage />;
}

