'use client';

import { useLocale } from 'next-intl';

export const dynamic = 'force-dynamic';
import styled from 'styled-components';
import Link from 'next/link';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Content = styled.div`
  max-width: 500px;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Button = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.accent};
  }
`;

export default function OfflinePage() {
  const locale = useLocale();

  return (
    <Container>
      <Content>
        <Title>
          {locale === 'es' ? 'Sin conexión' : locale === 'ar' ? 'غير متصل' : 'Offline'}
        </Title>
        <Message>
          {locale === 'es'
            ? 'Parece que no tienes conexión a Internet. Algunas funciones pueden no estar disponibles.'
            : locale === 'ar'
            ? 'يبدو أنك غير متصل بالإنترنت. قد لا تكون بعض الميزات متاحة.'
            : 'It seems you don\'t have an internet connection. Some features may not be available.'}
        </Message>
        <Button href={`/${locale}`}>
          {locale === 'es' ? 'Volver al inicio' : locale === 'ar' ? 'العودة للرئيسية' : 'Back to home'}
        </Button>
      </Content>
    </Container>
  );
}

