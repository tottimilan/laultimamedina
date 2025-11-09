import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import VideoDetail from '@/components/pages/VideoDetail';
import { getVideoBySlug } from '@/lib/strapi';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

interface VideoPageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params: { locale, slug },
}: VideoPageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'watch' });
  
  return generatePageMetadata({
    title: slug.replace(/-/g, ' '),
    description: t('subtitle'),
    locale: locale as Locale,
    path: `/watch/${slug}`,
    type: 'video.other',
  });
}

export default async function VideoPage({
  params: { locale, slug },
}: VideoPageProps) {
  // TODO: Conectar con Strapi
  // const video = await getVideoBySlug(slug, locale as Locale);
  // if (!video) notFound();

  const mockVideo = {
    id: '1',
    title: 'Los Fundamentos de la Fe Islámica',
    slug,
    synopsis: 'Una conferencia profunda sobre los pilares de la fe en el Islam y su aplicación en la vida cotidiana del musulmán.',
    provider: 'youtube' as const,
    videoId: 'dQw4w9WgXcQ',
    embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    transcript: `
# Transcripción de la Conferencia

## Introducción

As-salamu alaykum hermanos y hermanas. Hoy vamos a hablar sobre los fundamentos de la fe islámica...

## Los Pilares de la Fe

La fe islámica se sustenta en seis pilares fundamentales:

1. **Creencia en Allah** - El monoteísmo puro
2. **Creencia en los Ángeles** - Las criaturas de luz de Allah
3. **Creencia en los Libros** - La revelación divina
4. **Creencia en los Profetas** - Los mensajeros de Allah
5. **Creencia en el Día del Juicio** - La vida después de la muerte
6. **Creencia en el Decreto Divino** - Al-Qadar

Cada uno de estos pilares es esencial para completar nuestra fe...
    `,
    date: '2024-01-20T14:00:00Z',
    thumbnail: {
      id: '1',
      url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53',
      alternativeText: 'Conferencia sobre fe islámica',
      width: 1280,
      height: 720,
    },
    topics: [
      { id: '1', name: 'Fe', slug: 'fe' },
      { id: '2', name: 'Fundamentos', slug: 'fundamentos' },
    ],
    series: {
      id: '1',
      title: 'Pilares del Islam',
      slug: 'pilares-islam',
    },
    seo: {
      title: 'Los Fundamentos de la Fe Islámica',
      description: 'Una conferencia profunda sobre los pilares de la fe en el Islam',
    },
    locale: locale as Locale,
  };

  return <VideoDetail video={mockVideo} locale={locale} />;
}

