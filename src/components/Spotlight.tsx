'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const SpotlightSection = styled.section`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
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

const Tabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  flex-wrap: wrap;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: 2px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : theme.colors.border.medium};
  background: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : 'transparent'};
  color: ${({ theme, $isActive }) => 
    $isActive ? 'white' : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    ${({ $isActive, theme }) => !$isActive && `
      background: ${theme.colors.brand.primary}10;
    `}
  }
`;

const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

const SpotlightCard = styled(Link)`
  display: block;
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
    border-color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: ${({ theme }) => theme.colors.background.tertiary};
`;

const CardContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const CardType = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.primary};
  background: ${({ theme }) => theme.colors.brand.primary}15;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const CardTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardExcerpt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

type ContentType = 'all' | 'papers' | 'videos' | 'podcasts' | 'learn';

interface SpotlightItem {
  id: string;
  type: 'paper' | 'video' | 'podcast' | 'learn';
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

export default function Spotlight() {
  const locale = useLocale();
  const [activeTab, setActiveTab] = useState<ContentType>('all');

  const spotlightContent: SpotlightItem[] = [
    {
      id: '1',
      type: 'paper',
      title: locale === 'es' ? 'La importancia de la oración en el Islam' : 'The Importance of Prayer in Islam',
      excerpt: locale === 'es' 
        ? 'Un análisis profundo sobre el significado espiritual y práctico de la Salah'
        : 'A deep analysis of the spiritual and practical meaning of Salah',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa',
      href: `/${locale}/read/importancia-oracion-islam`,
    },
    {
      id: '2',
      type: 'video',
      title: locale === 'es' ? 'Los Fundamentos de la Fe Islámica' : 'Fundamentals of Islamic Faith',
      excerpt: locale === 'es' 
        ? 'Una conferencia sobre los pilares de la fe en el Islam'
        : 'A lecture on the pillars of faith in Islam',
      image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53',
      href: `/${locale}/watch/fundamentos-fe-islamica`,
    },
    {
      id: '3',
      type: 'podcast',
      title: locale === 'es' ? 'Reflexiones sobre el Ramadán' : 'Reflections on Ramadan',
      excerpt: locale === 'es' 
        ? 'Episodio sobre la espiritualidad del mes sagrado de Ramadán'
        : 'Episode on the spirituality of the sacred month of Ramadan',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
      href: `/${locale}/listen/reflexiones-ramadan-ep1`,
    },
    {
      id: '4',
      type: 'paper',
      title: locale === 'es' ? 'El Corán: Guía de vida' : 'The Quran: Life Guide',
      excerpt: locale === 'es' 
        ? 'Explorando cómo el Corán ofrece orientación para la vida moderna'
        : 'Exploring how the Quran offers guidance for modern life',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae',
      href: `/${locale}/read/coran-guia-de-vida`,
    },
    {
      id: '5',
      type: 'video',
      title: locale === 'es' ? 'Ciencia y Fe en el Islam' : 'Science and Faith in Islam',
      excerpt: locale === 'es' 
        ? 'Cómo el Islam ha promovido el conocimiento científico'
        : 'How Islam has promoted scientific knowledge',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa',
      href: `/${locale}/watch/ciencia-fe-islam`,
    },
    // LEARN TEMPORALMENTE OCULTO
    // {
    //   id: '6',
    //   type: 'learn',
    //   title: locale === 'es' ? 'Conversaciones sobre Fe' : 'Faith Conversations',
    //   excerpt: locale === 'es' 
    //     ? 'Módulo de discusiones guiadas sobre temas de fe'
    //     : 'Module of guided discussions on faith topics',
    //   image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655',
    //   href: `/${locale}/learn/conversations`,
    // },
  ];

  const filteredContent = activeTab === 'all' 
    ? spotlightContent 
    : spotlightContent.filter(item => item.type === activeTab.slice(0, -1));

  const tabs = [
    { id: 'all' as ContentType, label: locale === 'es' ? 'Todo' : locale === 'ar' ? 'الكل' : 'All', count: spotlightContent.length },
    { id: 'papers' as ContentType, label: locale === 'es' ? 'Artículos' : locale === 'ar' ? 'مقالات' : 'Papers', count: spotlightContent.filter(i => i.type === 'paper').length },
    { id: 'videos' as ContentType, label: locale === 'es' ? 'Vídeos' : locale === 'ar' ? 'فيديوهات' : 'Videos', count: spotlightContent.filter(i => i.type === 'video').length },
    { id: 'podcasts' as ContentType, label: 'Podcasts', count: spotlightContent.filter(i => i.type === 'podcast').length },
    // LEARN TEMPORALMENTE OCULTO
    // { id: 'learn' as ContentType, label: locale === 'es' ? 'Aprender' : locale === 'ar' ? 'تعلم' : 'Learn', count: spotlightContent.filter(i => i.type === 'learn').length },
  ];

  return (
    <SpotlightSection>
      <Container>
        <Header>
          <SectionTitle>{locale === 'es' ? 'Últimas Publicaciones' : locale === 'ar' ? 'أحدث المنشورات' : 'Latest Content'}</SectionTitle>
          <SectionSubtitle>
            {locale === 'es' 
              ? 'Explora nuestro contenido más popular y relevante'
              : 'Explore our most popular and relevant content'}
          </SectionSubtitle>
        </Header>

        <Tabs>
          {tabs.map((tab) => (
            <Tab
              key={tab.id}
              $isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label} ({tab.count})
            </Tab>
          ))}
        </Tabs>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ContentGrid>
              {filteredContent.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <SpotlightCard href={item.href}>
                    <CardImage>
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </CardImage>
                    <CardContent>
                      <CardType>
                        {item.type}
                      </CardType>
                      <CardTitle>{item.title}</CardTitle>
                      <CardExcerpt>{item.excerpt}</CardExcerpt>
                    </CardContent>
                  </SpotlightCard>
                </motion.div>
              ))}
            </ContentGrid>
          </motion.div>
        </AnimatePresence>
      </Container>
    </SpotlightSection>
  );
}

