'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import FilterBar from '@/components/FilterBar';
import Pagination from '@/components/Pagination';
import { motion } from 'framer-motion';

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
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['2xl']};
`;

const InfographicCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const InfographicImage = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  cursor: pointer;
`;

const InfographicContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const InfographicTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const InfographicDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DownloadButton = styled.a`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.accent};
  }
`;

export default function InfographicsHub({ searchParams }: { searchParams: Record<string, string> }) {
  const locale = useLocale();

  const mockInfographics = [
    {
      id: '1',
      title: locale === 'es' ? 'Vivir según la Promesa del Día del Juicio' : locale === 'ar' ? 'العيش وفق وعد يوم القيامة' : 'Living by Judgment Day\'s Promise',
      description: locale === 'es'
        ? 'En el Día del Juicio estaremos ante Dios. Esta infografía resume cómo este día prometido nos motiva.'
        : locale === 'ar'
        ? 'في يوم القيامة سنقف أمام الله. تلخص هذه الرسومات كيف يحفزنا هذا اليوم الموعود.'
        : 'On Judgment Day, we\'ll stand before God. This infographic summarizes how this promised day motivates us.',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0',
      downloadUrl: '/downloads/judgment-day.pdf',
    },
    {
      id: '2',
      title: locale === 'es' ? 'Cómo Pasar la Noche en Adoración' : locale === 'ar' ? 'كيف تقضي ليلتك في العبادة' : 'How to Spend Your Night in Worship',
      description: locale === 'es'
        ? 'Guía visual para aprovechar las horas nocturnas en oración y reflexión.'
        : locale === 'ar'
        ? 'دليل بصري للاستفادة من ساعات الليل في الصلاة والتأمل.'
        : 'Visual guide to make the most of nighttime hours in prayer and reflection.',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa',
      downloadUrl: '/downloads/night-worship.pdf',
    },
    {
      id: '3',
      title: locale === 'es' ? 'Construir Carácter con los Pilares Islámicos' : locale === 'ar' ? 'بناء الشخصية بالأركان الإسلامية' : 'Building Character with Islamic Pillars',
      description: locale === 'es'
        ? 'Cómo los cinco pilares del Islam moldean el carácter y la personalidad del musulmán.'
        : locale === 'ar'
        ? 'كيف تشكل الأركان الخمسة للإسلام شخصية المسلم.'
        : 'How the five pillars of Islam shape Muslim character and personality.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
      downloadUrl: '/downloads/islamic-pillars.pdf',
    },
  ];

  const filterOptions = {
    topics: [
      { value: 'worship', label: locale === 'es' ? 'Adoración' : locale === 'ar' ? 'العبادة' : 'Worship' },
      { value: 'character', label: locale === 'es' ? 'Carácter' : locale === 'ar' ? 'الشخصية' : 'Character' },
      { value: 'faith', label: locale === 'es' ? 'Fe' : locale === 'ar' ? 'الإيمان' : 'Faith' },
    ],
    sortOptions: [
      { value: 'latest', label: locale === 'es' ? 'Más recientes' : locale === 'ar' ? 'الأحدث' : 'Latest' },
      { value: 'popular', label: locale === 'es' ? 'Más populares' : locale === 'ar' ? 'الأكثر شعبية' : 'Most popular' },
    ],
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>
            {locale === 'es' ? 'Infografías' : locale === 'ar' ? 'الرسوم البيانية' : 'Infographics'}
          </Title>
          <Subtitle>
            {locale === 'es'
              ? 'Descarga y comparte infografías educativas sobre el Islam'
              : locale === 'ar'
              ? 'قم بتنزيل ومشاركة الرسوم البيانية التعليمية حول الإسلام'
              : 'Download and share educational infographics about Islam'}
          </Subtitle>
        </Header>

        <FilterBar
          filterOptions={filterOptions}
          currentFilters={{
            topic: searchParams.topic,
            sort: searchParams.sort || 'latest',
          }}
          basePath={`/${locale}/infographics`}
        />

        <Grid>
          {mockInfographics.map((infographic, index) => (
            <InfographicCard
              key={infographic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <InfographicImage>
                <Image
                  src={infographic.image}
                  alt={infographic.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </InfographicImage>
              <InfographicContent>
                <InfographicTitle>{infographic.title}</InfographicTitle>
                <InfographicDescription>{infographic.description}</InfographicDescription>
                <DownloadButton href={infographic.downloadUrl} download>
                  {locale === 'es' ? 'Descargar PDF' : locale === 'ar' ? 'تحميل PDF' : 'Download PDF'}
                </DownloadButton>
              </InfographicContent>
            </InfographicCard>
          ))}
        </Grid>

        <Pagination
          currentPage={1}
          totalPages={3}
          basePath={`/${locale}/infographics`}
          searchParams={searchParams}
        />
      </Container>
    </MainLayout>
  );
}

