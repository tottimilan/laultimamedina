import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PoliticaCookiesPage from '@/components/pages/institutional/PoliticaCookiesPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Política de Cookies' : locale === 'ar' ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy',
    description: locale === 'es'
      ? 'Información sobre el uso de cookies en La Última Medina'
      : locale === 'ar'
      ? 'معلومات حول استخدام ملفات تعريف الارتباط في المدينة الأخيرة'
      : 'Information about the use of cookies on La Última Medina',
    locale: locale as Locale,
    path: '/politica-cookies',
  });
}

export default function PoliticaCookies() {
  return <PoliticaCookiesPage />;
}

