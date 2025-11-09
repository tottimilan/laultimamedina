import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import WisayQaPage from '@/components/pages/learn/WisayQaPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Qué Dice el Islam - Preguntas y Respuestas' : locale === 'ar' ? 'ماذا يقول الإسلام - أسئلة وأجوبة' : 'What Islam Says - Q&A',
    description: locale === 'es'
      ? 'Catálogo completo de respuestas a preguntas comunes sobre el Islam'
      : locale === 'ar'
      ? 'كتالوج كامل للإجابات على الأسئلة الشائعة حول الإسلام'
      : 'Complete catalogue of answers to common questions about Islam',
    locale: locale as Locale,
    path: '/learn/wisay-qa',
  });
}

export default function WisayQa() {
  return <WisayQaPage />;
}

