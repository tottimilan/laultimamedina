'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const StaffPicksSection = styled.section`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.md};
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
    gap: ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const PickCard = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  position: relative;
  
  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

const StaffPickBadge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.md};
  right: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.brand.secondary};
  color: ${({ theme }) => theme.colors.brand.dark};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.full};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  text-transform: uppercase;
  z-index: 1;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.colors.background.tertiary};
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const CardDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export default function StaffPicks() {
  const locale = useLocale();

  const picks = [
    {
      id: '1',
      title: locale === 'es' ? 'Serie: Profeta Muhammad ﷺ' : locale === 'ar' ? 'سلسلة: النبي محمد ﷺ' : 'Series: Prophet Muhammad ﷺ',
      description: locale === 'es' 
        ? 'Colección completa sobre la vida y enseñanzas del Profeta'
        : locale === 'ar'
        ? 'مجموعة كاملة عن حياة وتعاليم النبي'
        : 'Complete collection on the life and teachings of the Prophet',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa',
      href: `/${locale}/read?series=profeta-muhammad`,
    },
    // LEARN TEMPORALMENTE OCULTO
    // {
    //   id: '2',
    //   title: locale === 'es' ? 'Curriculum: Ética Islámica' : locale === 'ar' ? 'منهج: الأخلاق الإسلامية' : 'Curriculum: Islamic Ethics',
    //   description: locale === 'es' 
    //     ? 'Programa educativo sobre moral y ética en el Islam'
    //     : locale === 'ar'
    //     ? 'برنامج تعليمي حول الأخلاق في الإسلام'
    //     : 'Educational program on morality and ethics in Islam',
    //   image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8',
    //   href: `/${locale}/learn/curriculum`,
    // },
    {
      id: '3',
      title: locale === 'es' ? 'Podcast: Vivir el Islam Hoy' : locale === 'ar' ? 'بودكاست: عيش الإسلام اليوم' : 'Podcast: Living Islam Today',
      description: locale === 'es' 
        ? 'Conversaciones sobre desafíos del musulmán contemporáneo'
        : locale === 'ar'
        ? 'محادثات حول التحديات التي يواجهها المسلم المعاصر'
        : 'Conversations on challenges facing contemporary Muslims',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
      href: `/${locale}/listen`,
    },
    {
      id: '4',
      title: locale === 'es' ? 'El Corán: Guía de Vida' : locale === 'ar' ? 'القرآن: دليل الحياة' : 'The Quran: Life Guide',
      description: locale === 'es'
        ? 'Explorando cómo el Corán ofrece orientación práctica para todos los aspectos de la vida moderna'
        : locale === 'ar'
        ? 'استكشاف كيف يقدم القرآن توجيهًا عمليًا لجميع جوانب الحياة المعاصرة'
        : 'Exploring how the Quran offers practical guidance for all aspects of modern life',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae',
      href: `/${locale}/read/coran-guia-de-vida`,
    },
  ];

  return (
    <StaffPicksSection>
      <Container>
        <Header>
          <SectionTitle>
            {locale === 'es' ? 'Recomendaciones del Equipo' : locale === 'ar' ? 'توصيات الفريق' : 'Staff Picks'}
          </SectionTitle>
          <SectionSubtitle>
            {locale === 'es' 
              ? 'Contenido seleccionado por nuestro equipo de académicos'
              : 'Content selected by our team of scholars'}
          </SectionSubtitle>
        </Header>

        <Grid>
          {picks.map((pick, index) => (
            <motion.div
              key={pick.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <PickCard href={pick.href}>
                <StaffPickBadge>
                  {locale === 'es' ? 'Destacado' : locale === 'ar' ? 'مميز' : 'Featured'}
                </StaffPickBadge>
                <CardImage>
                  <Image
                    src={pick.image}
                    alt={pick.title}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </CardImage>
                <CardContent>
                  <CardTitle>{pick.title}</CardTitle>
                  <CardDescription>{pick.description}</CardDescription>
                </CardContent>
              </PickCard>
            </motion.div>
          ))}
        </Grid>
      </Container>
    </StaffPicksSection>
  );
}

