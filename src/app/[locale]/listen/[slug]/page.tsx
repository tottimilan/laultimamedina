import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import PodcastDetail from '@/components/pages/PodcastDetail';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

interface PodcastPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params: { locale, slug },
}: PodcastPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'listen' });
  
  return generatePageMetadata({
    title: slug.replace(/-/g, ' '),
    description: t('subtitle'),
    locale: locale as Locale,
    path: `/listen/${slug}`,
  });
}

export default async function PodcastPage({
  params: { locale, slug },
}: PodcastPageProps) {
  // TODO: Conectar con Strapi
  const mockPodcast = {
    id: '1',
    title: 'Reflexiones sobre el Ramadán',
    slug,
    synopsis: 'Un episodio profundo sobre la espiritualidad del mes sagrado de Ramadán y cómo aprovecharlo al máximo.',
    audioUrl: 'https://example.com/audio.mp3',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // URL del video del podcast
    embedUrl: '<iframe src="https://example.com/embed/audio" width="100%" height="200"></iframe>',
    transcript: `
# Transcripción del Episodio

## Introducción

As-salamu alaykum queridos oyentes. Bienvenidos a este episodio especial sobre el mes de Ramadán...

## El Significado de Ramadán

Ramadán es el noveno mes del calendario islámico y el más sagrado. Es el mes en el que el Corán fue revelado al Profeta Muhammad ﷺ.

### Los Objetivos del Ayuno

1. **Taqwa** - Consciencia de Allah
2. **Autodisciplina** - Control de los deseos
3. **Empatía** - Comprender el hambre de los necesitados
4. **Purificación** - Limpieza espiritual

## Cómo Aprovechar Ramadán

Para sacar el máximo provecho de este mes bendito:

- Levántate para el suhoor
- Lee Corán diariamente
- Aumenta tus oraciones voluntarias
- Da caridad generosamente
- Busca Laylat al-Qadr

## Conclusión

Ramadán es una oportunidad única de renovación espiritual...
    `,
    date: '2024-01-25T10:00:00Z',
    series: {
      id: '1',
      title: 'Conversaciones Islámicas',
      slug: 'conversaciones-islamicas',
      cover: {
        id: '1',
        url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
      },
    },
    topics: [
      { id: '1', name: 'Ramadán', slug: 'ramadan' },
      { id: '2', name: 'Espiritualidad', slug: 'espiritualidad' },
    ],
    seo: {
      title: 'Reflexiones sobre el Ramadán',
      description: 'Un episodio sobre la espiritualidad del mes sagrado',
    },
    locale: locale as Locale,
  };

  return <PodcastDetail podcast={mockPodcast} locale={locale} />;
}

