'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import FilterBar from '@/components/FilterBar';
import PodcastCard from '@/components/cards/PodcastCard';
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

const mockPodcasts = [
  {
    id: '1',
    title: 'Reflexiones sobre el Ramadán',
    slug: 'reflexiones-ramadan-ep1',
    synopsis: 'Un episodio sobre la espiritualidad del mes sagrado de Ramadán',
    audioUrl: 'https://example.com/audio.mp3',
    date: '2024-01-25',
    series: {
      title: 'Conversaciones Islámicas',
      cover: { url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618' },
    },
    topics: [{ name: 'Ramadán', slug: 'ramadan' }],
  },
  {
    id: '2',
    title: 'Vivir el Islam en el Mundo Moderno',
    slug: 'vivir-islam-mundo-moderno-ep2',
    synopsis: 'Desafíos y oportunidades de practicar el Islam en la sociedad contemporánea',
    audioUrl: 'https://example.com/audio2.mp3',
    date: '2024-01-20',
    series: {
      title: 'Conversaciones Islámicas',
      cover: { url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618' },
    },
    topics: [{ name: 'Vida Musulmana', slug: 'vida-musulmana' }],
  },
  {
    id: '3',
    title: 'La Belleza de la Recitación Coránica',
    slug: 'belleza-recitacion-coranica',
    synopsis: 'Explorando el arte y la espiritualidad de la recitación del Corán',
    audioUrl: 'https://example.com/audio3.mp3',
    date: '2024-01-15',
    series: {
      title: 'Caminos hacia Allah',
      cover: { url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae' },
    },
    topics: [{ name: 'Corán', slug: 'coran' }],
  },
];

export default function ListenHub({ searchParams }: { searchParams: Record<string, string> }) {
  const t = useTranslations('listen');
  const locale = useLocale();

  const filterOptions = {
    topics: [
      { value: 'ramadan', label: 'Ramadán' },
      { value: 'espiritualidad', label: 'Espiritualidad' },
    ],
    sortOptions: [
      { value: 'latest', label: locale === 'es' ? 'Más recientes' : 'Latest' },
      { value: 'oldest', label: locale === 'es' ? 'Más antiguos' : 'Oldest' },
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
          basePath={`/${locale}/listen`}
        />

        <Grid>
          {mockPodcasts.map((podcast) => (
            <PodcastCard key={podcast.id} podcast={podcast} locale={locale} />
          ))}
        </Grid>

        <Pagination
          currentPage={1}
          totalPages={2}
          basePath={`/${locale}/listen`}
          searchParams={searchParams}
        />
      </Container>
    </MainLayout>
  );
}

