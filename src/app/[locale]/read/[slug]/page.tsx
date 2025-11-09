import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ArticleDetail from '@/components/pages/ArticleDetail';
import { getArticleBySlug } from '@/lib/strapi';
import { generatePageMetadata, generateArticleSchema } from '@/lib/seo';
import type { Locale } from '@/i18n';

/**
 * Página de detalle de artículo
 */

interface ArticlePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params: { locale, slug },
}: ArticlePageProps): Promise<Metadata> {
  // TODO: Conectar con Strapi cuando esté configurado
  // const article = await getArticleBySlug(slug, locale as Locale);
  // if (!article) return {};

  // Por ahora, metadata básica
  const t = await getTranslations({ locale, namespace: 'read' });
  
  return generatePageMetadata({
    title: slug.replace(/-/g, ' '),
    description: t('subtitle'),
    locale: locale as Locale,
    path: `/read/${slug}`,
  });
}

export default async function ArticlePage({
  params: { locale, slug },
}: ArticlePageProps) {
  // TODO: Conectar con Strapi cuando esté configurado
  // const article = await getArticleBySlug(slug, locale as Locale);
  // if (!article) notFound();

  // Por ahora, datos mock
  const mockArticle = {
    id: '1',
    title: 'La importancia de la oración en el Islam',
    slug,
    excerpt: 'Un análisis profundo sobre el significado espiritual y práctico de la oración (Salah) en la vida diaria del musulmán.',
    body: `
# La Oración en el Islam

La oración (Salah) es uno de los cinco pilares del Islam y representa el vínculo directo entre el creyente y su Creador.

## Significado Espiritual

La oración no es simplemente un ritual físico, sino un momento de conexión espiritual profunda. Durante la Salah, el musulmán se desconecta de las preocupaciones mundanas y se enfoca completamente en la presencia de Allah.

## Los Cinco Momentos

Las cinco oraciones diarias marcan el ritmo de la vida musulmana:

1. **Fajr** - La oración del amanecer
2. **Dhuhr** - La oración del mediodía
3. **Asr** - La oración de la tarde
4. **Maghrib** - La oración del ocaso
5. **Isha** - La oración de la noche

## Beneficios de la Oración

La oración regular trae numerosos beneficios:

- **Disciplina espiritual**: Mantiene al creyente consciente de su propósito
- **Paz interior**: Proporciona momentos de tranquilidad en la rutina diaria
- **Conexión comunitaria**: Las oraciones congregacionales fortalecen los lazos
- **Guía moral**: Actúa como recordatorio constante de los valores islámicos

## Conclusión

La Salah es mucho más que un deber religioso; es una fuente de fortaleza espiritual, guía moral y conexión con el Creador. Su práctica regular transforma la vida del creyente, proporcionando estructura, propósito y paz.
    `,
    type: 'blog' as const,
    readingTime: 8,
    publishedAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
    cover: {
      id: '1',
      url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=1200&h=630',
      alternativeText: 'Mezquita al atardecer',
      width: 1200,
      height: 630,
    },
    authors: [
      {
        id: '1',
        name: 'Dr. Ahmad Ibrahim',
        role: 'Investigador Islámico',
        photo: {
          id: '2',
          url: 'https://i.pravatar.cc/150?img=12',
        },
        shortBio: 'Especialista en estudios islámicos con más de 15 años de experiencia en educación religiosa.',
      },
    ],
    topics: [
      { id: '1', name: 'Adoración', slug: 'adoracion' },
      { id: '2', name: 'Espiritualidad', slug: 'espiritualidad' },
    ],
    series: {
      id: '1',
      title: 'Fundamentos de la Fe',
      slug: 'fundamentos-fe',
    },
    seo: {
      title: 'La importancia de la oración en el Islam',
      description: 'Un análisis profundo sobre el significado espiritual y práctico de la oración (Salah) en la vida diaria del musulmán.',
    },
    locale: locale as Locale,
  };

  return <ArticleDetail article={mockArticle} locale={locale} />;
}

