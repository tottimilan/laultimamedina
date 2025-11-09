'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import SearchBar from '@/components/SearchBar';
import SpotlightYaqeen from '@/components/SpotlightYaqeen';
import StaffPicks from '@/components/StaffPicks';
import Newsletter from '@/components/Newsletter';
import DonationCTA from '@/components/DonationCTA';
import { motion } from 'framer-motion';

const Hero = styled.section`
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  position: relative;
  background-image: url('/hero-background.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 70vh;
    padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.md};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 60vh;
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
  
  /* Overlay oscuro para legibilidad */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(13, 92, 71, 0.85) 0%, rgba(10, 46, 35, 0.75) 100%);
    z-index: 0;
  }
`;

const HeroContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Tagline = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 2px;
  color: ${({ theme }) => theme.colors.brand.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const SearchWrapper = styled.div`
  margin: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing['2xl']};
  width: 100%;
  max-width: none;
`;

const TrendingSection = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  padding: ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.md};
  }
`;

const TrendingContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  justify-content: center;
`;

const TrendingLabel = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const TrendingTopics = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
`;

const TrendingBadge = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.brand.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  border-radius: ${({ theme }) => theme.radii.full};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.primary};
    color: white;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const HeroTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['6xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  letter-spacing: -0.02em;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['4xl']};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

const HeroSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  opacity: 0.95;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.xl};
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const CTAContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.sm};
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }
`;

const PrimaryButton = styled(Link)`
  background: white;
  color: ${({ theme }) => theme.colors.brand.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: white;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  border: 2px solid white;
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  
  &:hover {
    background: white;
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

const Pillars = styled.section`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.md};
  }
`;

const PillarsContainer = styled.div`
  max-width: 1440px;
  margin: 0 auto;
`;

const PillarsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const PillarCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing['2xl']};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const PillarTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.primary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const PillarDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  max-width: 700px;
  margin: 0 auto;
`;

export default function HomePage() {
  const t = useTranslations('home');
  const locale = useLocale();

  const pillars = [
    {
      title: t('sections.read'),
      href: `/${locale}/read`,
      namespace: 'read',
    },
    {
      title: t('sections.watch'),
      href: `/${locale}/watch`,
      namespace: 'watch',
    },
    {
      title: t('sections.listen'),
      href: `/${locale}/listen`,
      namespace: 'listen',
    },
    // LEARN TEMPORALMENTE OCULTO
    // {
    //   title: t('sections.learn'),
    //   href: `/${locale}/learn`,
    //   namespace: 'learn',
    // },
  ];

  const trendingTopics = [
    { label: locale === 'es' ? 'Ramadán' : locale === 'ar' ? 'رمضان' : 'Ramadan', href: `/${locale}/read?topic=ramadan` },
    { label: locale === 'es' ? 'Oración' : locale === 'ar' ? 'الصلاة' : 'Prayer', href: `/${locale}/read?topic=oracion` },
    { label: locale === 'es' ? 'Corán' : locale === 'ar' ? 'القرآن' : 'Quran', href: `/${locale}/read?topic=coran` },
    { label: locale === 'es' ? 'Historia' : locale === 'ar' ? 'التاريخ' : 'History', href: `/${locale}/read?topic=historia` },
    { label: locale === 'es' ? 'Mujeres en el Islam' : locale === 'ar' ? 'المرأة في الإسلام' : 'Women in Islam', href: `/${locale}/read?topic=mujeres` },
  ];

  return (
    <MainLayout>
      <Hero>
        <HeroContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Tagline>
              {locale === 'es' ? 'Educación islámica accesible, rigurosa y transformadora' : locale === 'ar' ? 'التعليم الإسلامي الميسر والدقيق والتحويلي' : 'Accessible, rigorous, and transformative Islamic education'}
            </Tagline>
            <HeroTitle>{t('hero.title')}</HeroTitle>
            <HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
            
            <SearchWrapper>
              <SearchBar 
                placeholder={
                  locale === 'es' 
                    ? 'Buscar artículos, vídeos, podcasts...' 
                    : locale === 'ar'
                    ? 'ابحث عن المقالات والفيديوهات والبودكاست...'
                    : 'Search articles, videos, podcasts...'
                }
              />
            </SearchWrapper>
            
            <CTAContainer>
              <PrimaryButton href={`/${locale}/read`}>
                {t('hero.ctaPrimary')}
              </PrimaryButton>
              <SecondaryButton href={`/${locale}/donate`}>
                {t('hero.ctaSecondary')}
              </SecondaryButton>
            </CTAContainer>
          </motion.div>
        </HeroContent>
      </Hero>

      <TrendingSection>
        <TrendingContainer>
          <TrendingLabel>
            {locale === 'es' ? 'Temas Populares:' : locale === 'ar' ? 'المواضيع الشائعة:' : 'Trending:'}
          </TrendingLabel>
          <TrendingTopics>
            {trendingTopics.map((topic, index) => (
              <motion.div
                key={topic.href}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <TrendingBadge href={topic.href}>
                  {topic.label}
                </TrendingBadge>
              </motion.div>
            ))}
          </TrendingTopics>
        </TrendingContainer>
      </TrendingSection>

      <SpotlightYaqeen />

      <Pillars>
        <PillarsContainer>
        <SectionTitle>
          {locale === 'es' ? 'Explora Nuestros Pilares' : locale === 'ar' ? 'استكشف أركاننا' : 'Explore Our Pillars'}
        </SectionTitle>
        <SectionSubtitle>
          {locale === 'es'
            ? 'Cuatro formas de acceder al conocimiento islámico de calidad'
            : locale === 'ar'
            ? 'أربع طرق للوصول إلى المعرفة الإسلامية عالية الجودة'
            : 'Four ways to access quality Islamic knowledge'}
        </SectionSubtitle>
        
        <PillarsGrid>
          {pillars.map((pillar, index) => (
            <Link key={pillar.href} href={pillar.href} style={{ textDecoration: 'none' }}>
              <PillarCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <PillarTitle>{pillar.title}</PillarTitle>
                <PillarDescription>
                  {locale === 'es'
                    ? 'Descubre contenido de alta calidad y académicamente riguroso'
                    : locale === 'ar'
                    ? 'اكتشف محتوى عالي الجودة ودقيق أكاديميًا'
                    : 'Discover high-quality, academically rigorous content'}
                </PillarDescription>
              </PillarCard>
            </Link>
          ))}
        </PillarsGrid>
        </PillarsContainer>
      </Pillars>

      <StaffPicks />

      <Newsletter />

      <DonationCTA />
    </MainLayout>
  );
}

