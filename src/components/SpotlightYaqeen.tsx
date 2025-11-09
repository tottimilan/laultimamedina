'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const SpotlightSection = styled.section`
  background: ${({ theme }) => theme.colors.background.primary};
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.md};
  }
`;

const SpotlightContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  
  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.brand.secondary};
  }
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin: 0 ${({ theme }) => theme.spacing['2xl']};
  letter-spacing: -0.03rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: ${({ theme }) => theme.spacing['2xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-template-columns: 1fr;
  }
`;

const MainPost = styled.div`
  grid-column: span 5;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-column: span 1;
  }
`;

const Sidebar = styled.div`
  grid-column: span 3;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    grid-column: span 1;
  }
`;

const FeatureImage = styled(Link)`
  display: block;
  position: relative;
  width: 100%;
  height: 440px;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  
  &:hover {
    opacity: 0.95;
  }
`;

const Badge = styled.div<{ $variant?: 'latest' | 'featured' }>`
  display: inline-flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme, $variant }) => 
    $variant === 'latest' ? theme.colors.brand.secondary : theme.colors.status.info};
  border-radius: ${({ theme }) => theme.radii.sm};
  text-transform: uppercase;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: rgba(0, 0, 0, 0.6);
  letter-spacing: 0.04rem;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PostType = styled(Link)`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.accent};
  text-transform: uppercase;
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  letter-spacing: 0.04rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PostTitle = styled(Link)`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  letter-spacing: -0.04rem;
  
  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const Underline = styled.div`
  width: 40px;
  height: 2px;
  background: ${({ theme }) => theme.colors.brand.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Excerpt = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const SidebarList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
  padding-top: ${({ theme }) => theme.spacing.sm};
`;

const SidebarItem = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.xl};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:last-child {
    border-bottom: none;
  }
`;

const SidebarImage = styled(Link)`
  display: block;
  position: relative;
  width: 160px;
  height: 90px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;
  
  &:hover {
    opacity: 0.95;
  }
`;

const SidebarContent = styled.div`
  flex: 1;
`;

const SidebarTitle = styled(Link)`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

const SidebarExcerpt = styled.p`
  font-family: ${({ theme }) => theme.fonts.serif};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.4rem;
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

interface ContentItem {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  image: string;
  href: string;
}

export default function SpotlightYaqeen() {
  const locale = useLocale();
  const t = useTranslations('home.spotlight');

  const featuredPost: ContentItem = {
    id: '1',
    type: locale === 'es' ? 'Artículo' : locale === 'ar' ? 'ورقة بحثية' : 'Paper',
    title: locale === 'es' 
      ? 'La importancia de la oración en el Islam' 
      : locale === 'ar'
      ? 'أهمية الصلاة في الإسلام'
      : 'The Importance of Prayer in Islam',
    excerpt: locale === 'es'
      ? 'Un análisis profundo sobre el significado espiritual y práctico de la oración (Salah) en la vida diaria del musulmán y su impacto transformador.'
      : locale === 'ar'
      ? 'تحليل عميق للمعنى الروحي والعملي للصلاة في الحياة اليومية للمسلم وتأثيرها التحويلي.'
      : 'A deep analysis of the spiritual and practical meaning of prayer (Salah) in the daily life of a Muslim and its transformative impact.',
    image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa',
    href: `/${locale}/read/importancia-oracion-islam`,
  };

  const sidebarPosts: ContentItem[] = [
    {
      id: '2',
      type: locale === 'es' ? 'Video' : locale === 'ar' ? 'فيديو' : 'Video',
      title: locale === 'es' 
        ? 'Los Fundamentos de la Fe Islámica'
        : locale === 'ar'
        ? 'أسس الإيمان الإسلامي'
        : 'Fundamentals of Islamic Faith',
      excerpt: locale === 'es'
        ? 'Una conferencia profunda sobre los pilares de la fe en el Islam y su aplicación en la vida moderna.'
        : locale === 'ar'
        ? 'محاضرة عميقة حول أركان الإيمان في الإسلام وتطبيقها في الحياة المعاصرة.'
        : 'A profound lecture on the pillars of faith in Islam and their application in modern life.',
      image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53',
      href: `/${locale}/watch/fundamentos-fe-islamica`,
    },
    {
      id: '3',
      type: locale === 'es' ? 'Podcast' : locale === 'ar' ? 'بودكاست' : 'Podcast',
      title: locale === 'es'
        ? 'Reflexiones sobre el Ramadán'
        : locale === 'ar'
        ? 'تأملات في رمضان'
        : 'Reflections on Ramadan',
      excerpt: locale === 'es'
        ? 'Episodio profundo sobre la espiritualidad del mes sagrado y cómo aprovecharlo al máximo.'
        : locale === 'ar'
        ? 'حلقة عميقة حول روحانية الشهر الفضيل وكيفية الاستفادة منه إلى أقصى حد.'
        : 'Deep episode on the spirituality of the sacred month and how to make the most of it.',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
      href: `/${locale}/listen/reflexiones-ramadan-ep1`,
    },
    {
      id: '4',
      type: locale === 'es' ? 'Artículo' : locale === 'ar' ? 'ورقة بحثية' : 'Paper',
      title: locale === 'es'
        ? 'El Corán: Guía de vida'
        : locale === 'ar'
        ? 'القرآن: دليل الحياة'
        : 'The Quran: Life Guide',
      excerpt: locale === 'es'
        ? 'Explorando cómo el Corán ofrece orientación práctica para todos los aspectos de la vida moderna.'
        : locale === 'ar'
        ? 'استكشاف كيف يقدم القرآن توجيهًا عمليًا لجميع جوانب الحياة الحديثة.'
        : 'Exploring how the Quran offers practical guidance for all aspects of modern life.',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae',
      href: `/${locale}/read/coran-guia-de-vida`,
    },
  ];

  return (
    <SpotlightSection>
      <SpotlightContainer>
      <SectionHeader>
        <SectionTitle>{t('title')}</SectionTitle>
      </SectionHeader>

      <Grid>
        <MainPost>
          <FeatureImage href={featuredPost.href}>
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </FeatureImage>

          <Badge $variant="latest">
            {locale === 'es' ? 'Último' : locale === 'ar' ? 'الأحدث' : 'Latest'}
          </Badge>

          <PostType href={`/${locale}/read`}>
            {featuredPost.type}
          </PostType>

          <PostTitle href={featuredPost.href}>
            {featuredPost.title}
          </PostTitle>

          <Underline />

          <Excerpt>{featuredPost.excerpt}</Excerpt>
        </MainPost>

        <Sidebar>
          <SidebarList>
            {sidebarPosts.map((post) => (
              <SidebarItem key={post.id}>
                <SidebarImage href={post.href}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                </SidebarImage>
                
                <SidebarContent>
                  <PostType href={`/${locale}/${post.type.toLowerCase()}`}>
                    {post.type}
                  </PostType>
                  
                  <SidebarTitle href={post.href}>
                    {post.title}
                  </SidebarTitle>
                  
                  <Underline />
                  
                  <SidebarExcerpt>
                    {post.excerpt}
                  </SidebarExcerpt>
                </SidebarContent>
              </SidebarItem>
            ))}
          </SidebarList>
        </Sidebar>
      </Grid>
    </SpotlightContainer>
    </SpotlightSection>
  );
}

