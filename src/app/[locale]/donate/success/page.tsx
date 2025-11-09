'use client';

import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { useTranslations, useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Icon = styled(motion.div)`
  font-size: 5rem;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Button = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

export default function DonateSuccessPage() {
  const t = useTranslations('donate');
  const locale = useLocale();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <MainLayout>
      <Container>
        <Icon
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
        >
          ✅
        </Icon>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Title>
            {locale === 'es' 
              ? '¡Gracias por tu generosa donación!' 
              : 'Thank you for your generous donation!'}
          </Title>
          
          <Message>
            {locale === 'es'
              ? 'Tu apoyo hace posible que sigamos ofreciendo educación islámica de calidad, accesible para todos. Recibirás un correo de confirmación en breve.'
              : 'Your support makes it possible for us to continue providing quality Islamic education, accessible to all. You will receive a confirmation email shortly.'}
          </Message>

          <Button href={`/${locale}`}>
            {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
          </Button>
        </motion.div>
      </Container>
    </MainLayout>
  );
}

