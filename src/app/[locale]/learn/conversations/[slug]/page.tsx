import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ConversationDetail from '@/components/pages/learn/ConversationDetail';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

interface ConversationPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params: { locale, slug },
}: ConversationPageProps): Promise<Metadata> {
  return generatePageMetadata({
    title: slug.replace(/-/g, ' '),
    description: locale === 'es' 
      ? 'Deck de conversación para discusiones de fe'
      : locale === 'ar'
      ? 'مجموعة محادثات لمناقشات الإيمان'
      : 'Conversation deck for faith discussions',
    locale: locale as Locale,
    path: `/learn/conversations/${slug}`,
  });
}

export default async function ConversationPage({
  params: { locale, slug },
}: ConversationPageProps) {
  // TODO: Conectar con Strapi
  const mockConversation = {
    id: '1',
    slug,
    title: locale === 'es' ? '¿Por qué Dios pide que lo adoremos?' : locale === 'ar' ? 'لماذا يطلب الله أن نعبده؟' : 'Why Does God Ask People to Worship Him?',
    description: locale === 'es'
      ? 'Esta conversación explora el propósito de la adoración en el Islam y cómo beneficia al ser humano, no a Dios.'
      : locale === 'ar'
      ? 'تستكشف هذه المحادثة غرض العبادة في الإسلام وكيف تفيد الإنسان وليس الله.'
      : 'This conversation explores the purpose of worship in Islam and how it benefits humans, not God.',
    cards: 12,
    duration: locale === 'es' ? '45 min' : locale === 'ar' ? '45 دقيقة' : '45 min',
  };

  return <ConversationDetail conversation={mockConversation} locale={locale} />;
}

