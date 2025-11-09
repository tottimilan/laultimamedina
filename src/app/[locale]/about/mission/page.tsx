import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import MissionPage from '@/components/pages/institutional/MissionPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Nuestra Misión' : 'Our Mission',
    description: locale === 'es' 
      ? 'Conoce la misión de La Última Medina y nuestro compromiso con la educación islámica de calidad'
      : 'Learn about La Última Medina\'s mission and our commitment to quality Islamic education',
    locale: locale as Locale,
    path: '/about/mission',
  });
}

export default function Mission() {
  return <MissionPage />;
}

