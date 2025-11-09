'use client';

import Link from 'next/link';

export const dynamic = 'force-dynamic';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Icon = styled.div`
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

const ButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
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

const SecondaryButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: transparent;
  border: 2px solid ${({ theme }) => theme.colors.brand.primary};
  color: ${({ theme }) => theme.colors.brand.primary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.primary};
    color: white;
  }
`;

export default function DonateCancelPage() {
  const locale = useLocale();

  return (
    <MainLayout>
      <Container>
        <Icon>⚠️</Icon>
        
        <Title>
          {locale === 'es' 
            ? 'Donación cancelada' 
            : 'Donation cancelled'}
        </Title>
        
        <Message>
          {locale === 'es'
            ? 'Tu donación fue cancelada. Si hubo algún problema, no dudes en intentarlo de nuevo o contactarnos.'
            : 'Your donation was cancelled. If there was a problem, feel free to try again or contact us.'}
        </Message>

        <ButtonGroup>
          <Button href={`/${locale}/donate`}>
            {locale === 'es' ? 'Intentar de nuevo' : 'Try again'}
          </Button>
          <SecondaryButton href={`/${locale}`}>
            {locale === 'es' ? 'Volver al inicio' : 'Back to home'}
          </SecondaryButton>
        </ButtonGroup>
      </Container>
    </MainLayout>
  );
}

