import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PoliticaGeneralPage from '@/components/pages/institutional/PoliticaGeneralPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Política General' : locale === 'ar' ? 'السياسة العامة' : 'General Policy',
    description: locale === 'es'
      ? 'Política general y términos de uso de La Última Medina'
      : locale === 'ar'
      ? 'السياسة العامة وشروط الاستخدام للمدينة الأخيرة'
      : 'General policy and terms of use of La Última Medina',
    locale: locale as Locale,
    path: '/politica-general',
  });
}

export default function PoliticaGeneral() {
  return <PoliticaGeneralPage />;
}

