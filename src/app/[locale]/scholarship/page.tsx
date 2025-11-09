import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ScholarshipPage from '@/components/pages/ScholarshipPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Becas' : locale === 'ar' ? 'المنح الدراسية' : 'Scholarship',
    description: locale === 'es'
      ? 'Programa de becas para estudiantes musulmanes comprometidos con el conocimiento y la justicia'
      : locale === 'ar'
      ? 'برنامج منح للطلاب المسلمين الملتزمين بالمعرفة والعدالة'
      : 'Scholarship program for Muslim students committed to knowledge and justice',
    locale: locale as Locale,
    path: '/scholarship',
  });
}

export default function Scholarship() {
  return <ScholarshipPage />;
}

