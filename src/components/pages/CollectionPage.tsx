'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import ArticleCard from '@/components/cards/ArticleCard';
import VideoCard from '@/components/cards/VideoCard';
import PodcastCard from '@/components/cards/PodcastCard';

const Hero = styled.div`
  position: relative;
  height: 400px;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.7) 100%);
  }
`;

const HeroContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  z-index: 1;
  color: white;
  max-width: 1280px;
  margin: 0 auto;
`;

const CollectionTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CollectionDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  max-width: 700px;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing['4xl']};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 2px solid ${({ theme }) => theme.colors.brand.secondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

interface CollectionPageProps {
  collection: {
    id: string;
    title: string;
    slug: string;
    description: string;
    heroImage: string;
    colorTheme: string;
  };
  locale: string;
}

export default function CollectionPage({ collection, locale }: CollectionPageProps) {
  // Mock data - en producción vendría de Strapi
  const mockArticles = [
    {
      id: '1',
      title: locale === 'es' ? 'La importancia de la oración en el Islam' : 'The Importance of Prayer',
      slug: 'importancia-oracion-islam',
      excerpt: 'Análisis profundo sobre la Salah...',
      type: 'paper' as const,
      readingTime: 8,
      publishedAt: '2024-01-15',
      cover: { url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa', alternativeText: '' },
      authors: [{ name: 'Dr. Ahmad Ibrahim', photo: { url: 'https://i.pravatar.cc/150?img=12' } }],
      topics: [{ name: 'Adoración', slug: 'adoracion' }],
    },
  ];

  const mockVideos = [
    {
      id: '1',
      title: locale === 'es' ? 'Fundamentos de la Fe' : 'Fundamentals of Faith',
      slug: 'fundamentos-fe',
      provider: 'youtube' as const,
      thumbnail: { url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53' },
      date: '2024-01-20',
      topics: [],
    },
  ];

  return (
    <MainLayout>
      <Hero>
        <Image
          src={collection.heroImage}
          alt={collection.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <HeroContent>
          <CollectionTitle>{collection.title}</CollectionTitle>
          <CollectionDescription>{collection.description}</CollectionDescription>
        </HeroContent>
      </Hero>

      <Container>
        <Section>
          <SectionTitle>
            {locale === 'es' ? 'Artículos' : locale === 'ar' ? 'المقالات' : 'Articles'}
          </SectionTitle>
          <Grid>
            {mockArticles.map((article) => (
              <ArticleCard key={article.id} article={article} locale={locale} />
            ))}
          </Grid>
        </Section>

        <Section>
          <SectionTitle>
            {locale === 'es' ? 'Videos' : locale === 'ar' ? 'الفيديوهات' : 'Videos'}
          </SectionTitle>
          <Grid>
            {mockVideos.map((video) => (
              <VideoCard key={video.id} video={video} locale={locale} />
            ))}
          </Grid>
        </Section>
      </Container>
    </MainLayout>
  );
}

