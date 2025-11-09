import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import CollectionPage from '@/components/pages/CollectionPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

interface CollectionPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params: { locale, slug },
}: CollectionPageProps): Promise<Metadata> {
  return generatePageMetadata({
    title: slug.replace(/-/g, ' '),
    description: locale === 'es' 
      ? 'Colección temática de contenido islámico'
      : locale === 'ar'
      ? 'مجموعة موضوعية من المحتوى الإسلامي'
      : 'Thematic collection of Islamic content',
    locale: locale as Locale,
    path: `/collections/${slug}`,
  });
}

export default async function Collection({
  params: { locale, slug },
}: CollectionPageProps) {
  // TODO: Conectar con Strapi
  const mockCollection = {
    id: '1',
    title: locale === 'es' ? 'Profeta Muhammad ﷺ' : locale === 'ar' ? 'النبي محمد ﷺ' : 'Prophet Muhammad ﷺ',
    slug,
    description: locale === 'es'
      ? 'Colección completa sobre la vida, enseñanzas y ejemplo del Profeta Muhammad ﷺ'
      : locale === 'ar'
      ? 'مجموعة كاملة عن حياة وتعاليم ومثال النبي محمد ﷺ'
      : 'Complete collection on the life, teachings and example of Prophet Muhammad ﷺ',
    heroImage: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa',
    colorTheme: '#0d5c47',
  };

  return <CollectionPage collection={mockCollection} locale={locale} />;
}

