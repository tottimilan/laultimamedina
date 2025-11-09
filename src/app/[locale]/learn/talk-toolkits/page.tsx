import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import TalkToolkitsPage from '@/components/pages/learn/TalkToolkitsPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Herramientas para Charlas' : locale === 'ar' ? 'أدوات المحاضرات' : 'Talk Toolkits',
    description: locale === 'es'
      ? 'Recursos completos para dar charlas y conferencias sobre Islam con facilidad'
      : locale === 'ar'
      ? 'موارد كاملة لإلقاء محاضرات حول الإسلام بسهولة'
      : 'Complete resources to deliver talks and lectures on Islam with ease',
    locale: locale as Locale,
    path: '/learn/talk-toolkits',
  });
}

export default function TalkToolkits() {
  return <TalkToolkitsPage />;
}

