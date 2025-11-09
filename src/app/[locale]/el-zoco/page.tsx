import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ElZocoPage from '@/components/pages/ElZocoPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'El Zoco' : locale === 'ar' ? 'السوق' : 'The Souk',
    description: locale === 'es'
      ? 'Espacio de comunidad de La Última Medina para compartir, aprender y crecer juntos'
      : locale === 'ar'
      ? 'مساحة مجتمع المدينة الأخيرة للمشاركة والتعلم والنمو معًا'
      : 'La Última Medina community space to share, learn and grow together',
    locale: locale as Locale,
    path: '/el-zoco',
  });
}

export default function ElZoco() {
  return <ElZocoPage />;
}

