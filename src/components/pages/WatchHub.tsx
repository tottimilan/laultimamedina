'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import FilterBar from '@/components/FilterBar';
import VideoCard from '@/components/cards/VideoCard';
import Pagination from '@/components/Pagination';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

const mockVideos = [
  {
    id: '1',
    title: 'Los Fundamentos de la Fe Islámica',
    slug: 'fundamentos-fe-islamica',
    synopsis: 'Una conferencia profunda sobre los pilares de la fe en el Islam',
    provider: 'youtube' as const,
    videoId: 'dQw4w9WgXcQ',
    thumbnail: { url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53' },
    date: '2024-01-20',
    topics: [{ name: 'Fe', slug: 'fe' }],
  },
  {
    id: '2',
    title: 'El Profeta Muhammad: Modelo de Vida',
    slug: 'profeta-muhammad-modelo-vida',
    synopsis: 'Explorando las enseñanzas y el ejemplo del Profeta Muhammad (la paz sea con él)',
    provider: 'youtube' as const,
    videoId: 'example123',
    thumbnail: { url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa' },
    date: '2024-01-18',
    topics: [{ name: 'Sunnah', slug: 'sunnah' }],
  },
  {
    id: '3',
    title: 'Ciencia y Fe en el Islam',
    slug: 'ciencia-fe-islam',
    synopsis: 'Cómo el Islam ha promovido históricamente el conocimiento científico',
    provider: 'youtube' as const,
    videoId: 'example456',
    thumbnail: { url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa' },
    date: '2024-01-15',
    topics: [{ name: 'Ciencia', slug: 'ciencia' }],
  },
];

export default function WatchHub({ searchParams }: { searchParams: Record<string, string> }) {
  const t = useTranslations('watch');
  const locale = useLocale();

  const filterOptions = {
    topics: [
      { value: 'fe', label: 'Fe' },
      { value: 'historia', label: 'Historia' },
    ],
    sortOptions: [
      { value: 'latest', label: locale === 'es' ? 'Más recientes' : 'Latest' },
      { value: 'oldest', label: locale === 'es' ? 'Más antiguos' : 'Oldest' },
      { value: 'popular', label: locale === 'es' ? 'Más populares' : 'Most popular' },
    ],
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>{t('title')}</Title>
          <Subtitle>{t('subtitle')}</Subtitle>
        </Header>

        <FilterBar
          filterOptions={filterOptions}
          currentFilters={{
            topic: searchParams.topic,
            sort: searchParams.sort || 'latest',
          }}
          basePath={`/${locale}/watch`}
        />

        <Grid>
          {mockVideos.map((video) => (
            <VideoCard key={video.id} video={video} locale={locale} />
          ))}
        </Grid>

        <Pagination
          currentPage={1}
          totalPages={3}
          basePath={`/${locale}/watch`}
          searchParams={searchParams}
        />
      </Container>
    </MainLayout>
  );
}

