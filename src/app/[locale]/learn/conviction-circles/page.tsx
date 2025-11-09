import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ConvictionCirclesPage from '@/components/pages/learn/ConvictionCirclesPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Círculos de Convicción' : locale === 'ar' ? 'دوائر الإيمان' : 'Conviction Circles',
    description: locale === 'es'
      ? 'Discusiones grupales profundas e intelectuales sobre temas desafiantes de fe'
      : locale === 'ar'
      ? 'مناقشات جماعية عميقة وفكرية حول قضايا الإيمان الصعبة'
      : 'Deep intellectual group discussions on challenging faith topics',
    locale: locale as Locale,
    path: '/learn/conviction-circles',
  });
}

export default function ConvictionCircles() {
  return <ConvictionCirclesPage />;
}

