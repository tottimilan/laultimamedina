import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ConversationsPage from '@/components/pages/learn/ConversationsPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Conversaciones' : locale === 'ar' ? 'محادثات' : 'Conversations',
    description: locale === 'es' 
      ? 'Conversaciones educativas diseñadas para discusiones de fe con claridad y perspectiva'
      : locale === 'ar'
      ? 'محادثات تعليمية مصممة لمناقشات الإيمان بوضوح وعمق'
      : 'Educational conversations designed for faith discussions with clarity and perspective',
    locale: locale as Locale,
    path: '/learn/conversations',
  });
}

export default function Conversations() {
  return <ConversationsPage />;
}

