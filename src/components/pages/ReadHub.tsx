'use client';

import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import FilterBar from '@/components/FilterBar';
import ArticleCard from '@/components/cards/ArticleCard';
import Pagination from '@/components/Pagination';
import { useState } from 'react';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

interface ReadHubProps {
  searchParams: {
    type?: string;
    topic?: string;
    series?: string;
    sort?: string;
    page?: string;
  };
}

// Datos de ejemplo - en producción vendrían de Strapi
const mockArticles = [
  {
    id: '1',
    title: 'La importancia de la oración en el Islam',
    slug: 'importancia-oracion-islam',
    excerpt: 'Un análisis profundo sobre el significado espiritual y práctico de la oración (Salah) en la vida diaria del musulmán.',
    type: 'blog' as const,
    readingTime: 8,
    publishedAt: '2024-01-15',
    cover: {
      url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa',
      alternativeText: 'Mezquita al atardecer',
    },
    authors: [
      {
        name: 'Dr. Ahmad Ibrahim',
        photo: { url: 'https://i.pravatar.cc/150?img=12' },
      },
    ],
    topics: [
      { name: 'Adoración', slug: 'adoracion' },
    ],
  },
  {
    id: '2',
    title: 'El Corán: Guía de vida',
    slug: 'coran-guia-de-vida',
    excerpt: 'Explorando cómo el Corán ofrece orientación práctica para todos los aspectos de la vida moderna.',
    type: 'paper' as const,
    readingTime: 15,
    publishedAt: '2024-01-10',
    cover: {
      url: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae',
      alternativeText: 'Corán abierto',
    },
    authors: [
      {
        name: 'Dra. Fatima Al-Zahrani',
        photo: { url: 'https://i.pravatar.cc/150?img=45' },
      },
    ],
    topics: [
      { name: 'Corán', slug: 'coran' },
      { name: 'Espiritualidad', slug: 'espiritualidad' },
    ],
  },
  {
    id: '3',
    title: 'Historia del Islam en Al-Andalus',
    slug: 'historia-islam-al-andalus',
    excerpt: 'Un recorrido por el legado cultural y científico del Islam en la península ibérica durante la Edad Media.',
    type: 'report' as const,
    readingTime: 20,
    publishedAt: '2024-01-05',
    cover: {
      url: 'https://images.unsplash.com/photo-1558114965-eeb97aa84c3b',
      alternativeText: 'Alhambra de Granada',
    },
    authors: [
      {
        name: 'Dr. Hassan Malik',
        photo: { url: 'https://i.pravatar.cc/150?img=33' },
      },
    ],
    topics: [
      { name: 'Historia', slug: 'historia' },
      { name: 'Cultura', slug: 'cultura' },
    ],
  },
];

export default function ReadHub({ searchParams }: ReadHubProps) {
  const t = useTranslations('read');
  const locale = useLocale();
  
  // En producción, estos datos vendrían de Strapi
  const articles = mockArticles;
  const totalPages = 5;
  const currentPage = parseInt(searchParams.page || '1');

  const filterOptions = {
    types: [
      { value: 'all', label: t('types.all') },
      { value: 'paper', label: t('types.paper') },
      { value: 'blog', label: t('types.blog') },
      { value: 'ebook', label: t('types.ebook') },
      { value: 'report', label: t('types.report') },
      { value: 'translation', label: t('types.translation') },
    ],
    topics: [
      { value: 'adoracion', label: 'Adoración' },
      { value: 'coran', label: 'Corán' },
      { value: 'espiritualidad', label: 'Espiritualidad' },
      { value: 'historia', label: 'Historia' },
      { value: 'cultura', label: 'Cultura' },
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
            type: searchParams.type,
            topic: searchParams.topic,
            sort: searchParams.sort || 'latest',
          }}
          basePath={`/${locale}/read`}
        />

        {articles.length > 0 ? (
          <>
            <Grid>
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  article={article}
                  locale={locale}
                />
              ))}
            </Grid>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              basePath={`/${locale}/read`}
              searchParams={searchParams}
            />
          </>
        ) : (
          <EmptyState>
            <p>{locale === 'es' ? 'No se encontraron artículos con los filtros seleccionados.' : 'No articles found with the selected filters.'}</p>
          </EmptyState>
        )}
      </Container>
    </MainLayout>
  );
}

