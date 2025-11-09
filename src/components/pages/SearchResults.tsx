'use client';

import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import SearchBar from '@/components/SearchBar';
import ArticleCard from '@/components/cards/ArticleCard';
import VideoCard from '@/components/cards/VideoCard';
import PodcastCard from '@/components/cards/PodcastCard';

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
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ResultsCount = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SearchWrapper = styled.div`
  max-width: 700px;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const FilterTabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.light};
  flex-wrap: wrap;
`;

const FilterTab = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  background: transparent;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  border-bottom: 3px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : 'transparent'};
  transition: all ${({ theme }) => theme.transitions.base};
  position: relative;
  top: 2px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['5xl']} ${({ theme }) => theme.spacing.xl};
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const EmptyTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EmptyText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

interface SearchResultsProps {
  searchParams: {
    q?: string;
    type?: string;
  };
}

export default function SearchResults({ searchParams }: SearchResultsProps) {
  const locale = useLocale();
  const query = searchParams.q || '';
  const activeType = searchParams.type || 'all';

  // TODO: Conectar con Strapi o Meilisearch para búsqueda real
  // Por ahora, usar datos mock
  const mockResults = {
    articles: query ? [
      {
        id: '1',
        title: 'La importancia de la oración en el Islam',
        slug: 'importancia-oracion-islam',
        excerpt: 'Un análisis profundo sobre el significado espiritual y práctico de la oración (Salah).',
        type: 'blog' as const,
        readingTime: 8,
        publishedAt: '2024-01-15',
        cover: { url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa', alternativeText: 'Mezquita' },
        authors: [{ name: 'Dr. Ahmad Ibrahim', photo: { url: 'https://i.pravatar.cc/150?img=12' } }],
        topics: [{ name: 'Adoración', slug: 'adoracion' }],
      },
    ] : [],
    videos: query ? [
      {
        id: '1',
        title: 'Los Fundamentos de la Fe Islámica',
        slug: 'fundamentos-fe-islamica',
        synopsis: 'Una conferencia profunda sobre los pilares de la fe',
        provider: 'youtube' as const,
        videoId: 'example',
        thumbnail: { url: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53' },
        date: '2024-01-20',
        topics: [{ name: 'Fe', slug: 'fe' }],
      },
    ] : [],
    podcasts: query ? [
      {
        id: '1',
        title: 'Reflexiones sobre el Ramadán',
        slug: 'reflexiones-ramadan-ep1',
        synopsis: 'Sobre la espiritualidad del mes sagrado',
        audioUrl: 'https://example.com/audio.mp3',
        date: '2024-01-25',
        series: { title: 'Conversaciones Islámicas', cover: { url: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618' } },
        topics: [{ name: 'Ramadán', slug: 'ramadan' }],
      },
    ] : [],
  };

  const allResults = [
    ...mockResults.articles.map(item => ({ ...item, resultType: 'article' })),
    ...mockResults.videos.map(item => ({ ...item, resultType: 'video' })),
    ...mockResults.podcasts.map(item => ({ ...item, resultType: 'podcast' })),
  ];

  const filteredResults = activeType === 'all' 
    ? allResults
    : allResults.filter(item => item.resultType === activeType);

  const totalCount = filteredResults.length;

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>
            {query 
              ? `${locale === 'es' ? 'Resultados para' : 'Results for'}: "${query}"`
              : (locale === 'es' ? 'Buscar' : 'Search')
            }
          </Title>
          {query && (
            <ResultsCount>
              {totalCount} {locale === 'es' ? 'resultados encontrados' : 'results found'}
            </ResultsCount>
          )}
        </Header>

        <SearchWrapper>
          <SearchBar autoFocus />
        </SearchWrapper>

        <FilterTabs>
          <FilterTab
            $isActive={activeType === 'all'}
            onClick={() => window.location.href = `/${locale}/search?q=${query}`}
          >
            {locale === 'es' ? 'Todos' : 'All'} ({allResults.length})
          </FilterTab>
          <FilterTab
            $isActive={activeType === 'article'}
            onClick={() => window.location.href = `/${locale}/search?q=${query}&type=article`}
          >
            {locale === 'es' ? 'Artículos' : 'Articles'} ({mockResults.articles.length})
          </FilterTab>
          <FilterTab
            $isActive={activeType === 'video'}
            onClick={() => window.location.href = `/${locale}/search?q=${query}&type=video`}
          >
            {locale === 'es' ? 'Vídeos' : 'Videos'} ({mockResults.videos.length})
          </FilterTab>
          <FilterTab
            $isActive={activeType === 'podcast'}
            onClick={() => window.location.href = `/${locale}/search?q=${query}&type=podcast`}
          >
            Podcasts ({mockResults.podcasts.length})
          </FilterTab>
        </FilterTabs>

        {totalCount > 0 ? (
          <ResultsGrid>
            {filteredResults.map((result) => {
              if (result.resultType === 'article') {
                return <ArticleCard key={result.id} article={result as any} locale={locale} />;
              }
              if (result.resultType === 'video') {
                return <VideoCard key={result.id} video={result as any} locale={locale} />;
              }
              if (result.resultType === 'podcast') {
                return <PodcastCard key={result.id} podcast={result as any} locale={locale} />;
              }
              return null;
            })}
          </ResultsGrid>
        ) : (
          <EmptyState>
            <EmptyIcon>🔍</EmptyIcon>
            <EmptyTitle>
              {query 
                ? (locale === 'es' ? 'No se encontraron resultados' : 'No results found')
                : (locale === 'es' ? '¿Qué estás buscando?' : 'What are you looking for?')
              }
            </EmptyTitle>
            <EmptyText>
              {query 
                ? (locale === 'es' 
                    ? 'Intenta con otros términos de búsqueda' 
                    : 'Try different search terms')
                : (locale === 'es' 
                    ? 'Escribe algo en el buscador para empezar' 
                    : 'Type something in the search bar to get started')
              }
            </EmptyText>
          </EmptyState>
        )}
      </Container>
    </MainLayout>
  );
}

