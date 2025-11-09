'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CTASection = styled.section`
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  padding: ${({ theme }) => theme.spacing['5xl']} ${({ theme }) => theme.spacing.xl};
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(212, 175, 55, 0.1) 1px, transparent 1px);
    background-size: 40px 40px;
    animation: rotate 60s linear infinite;
  }
  
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  opacity: 0.95;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  justify-content: center;
  flex-wrap: wrap;
`;

const PrimaryButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.brand.secondary};
  color: ${({ theme }) => theme.colors.brand.dark};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme }) => theme.radii.xl};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: white;
    transform: translateY(-4px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
`;

const SecondaryButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['3xl']};
  background: transparent;
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border: 3px solid white;
  border-radius: ${({ theme }) => theme.radii.xl};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: white;
    color: ${({ theme }) => theme.colors.brand.dark};
    transform: translateY(-4px);
  }
`;

const ImpactStats = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  padding-top: ${({ theme }) => theme.spacing['3xl']};
  border-top: 1px solid rgba(255, 255, 255, 0.2);
`;

const Stat = styled.div`
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.9;
`;

export default function DonationCTA() {
  const locale = useLocale();

  return (
    <CTASection>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Title>
            {locale === 'es' 
              ? 'Apoya la Educación Islámica de Calidad'
              : locale === 'ar'
              ? 'ادعم التعليم الإسلامي عالي الجودة'
              : 'Support Quality Islamic Education'}
          </Title>
          <Description>
            {locale === 'es' 
              ? 'Tu generosidad permite que miles de personas accedan a educación islámica rigurosa y transformadora. Cada donación marca la diferencia.'
              : locale === 'ar'
              ? 'كرمك يمكّن الآلاف من الوصول إلى التعليم الإسلامي الدقيق والتحويلي. كل تبرع يحدث فرقًا.'
              : 'Your generosity enables thousands to access rigorous and transformative Islamic education. Every donation makes a difference.'}
          </Description>

          <ButtonGroup>
            <PrimaryButton href={`/${locale}/donate`}>
              {locale === 'es' ? 'Donar Ahora' : locale === 'ar' ? 'تبرع الآن' : 'Donate Now'}
            </PrimaryButton>
            <SecondaryButton href={`/${locale}/sustain`}>
              {locale === 'es' ? 'Donación Mensual' : locale === 'ar' ? 'تبرع شهري' : 'Monthly Giving'}
            </SecondaryButton>
          </ButtonGroup>
        </motion.div>
      </Container>
    </CTASection>
  );
}

