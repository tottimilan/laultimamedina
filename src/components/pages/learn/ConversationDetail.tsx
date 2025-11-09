'use client';

import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Meta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
`;

const ComingSoon = styled.div`
  background: ${({ theme }) => theme.colors.background.secondary};
  border: 2px solid ${({ theme }) => theme.colors.brand.primary};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing['3xl']};
  text-align: center;
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.brand.dark};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    color: ${({ theme }) => theme.colors.text.secondary};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }
`;

interface ConversationDetailProps {
  conversation: any;
  locale: string;
}

export default function ConversationDetail({ conversation, locale }: ConversationDetailProps) {
  return (
    <MainLayout>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header>
            <Title>{conversation.title}</Title>
            <Meta>
              <span>{conversation.cards} {locale === 'es' ? 'tarjetas' : locale === 'ar' ? 'بطاقة' : 'cards'}</span>
              <span>•</span>
              <span>{conversation.duration}</span>
            </Meta>
          </Header>

          <Description>{conversation.description}</Description>

          <ComingSoon>
            <h2>
              {locale === 'es' ? 'Contenido Disponible Pronto' : locale === 'ar' ? 'المحتوى متاح قريبًا' : 'Content Available Soon'}
            </h2>
            <p>
              {locale === 'es'
                ? 'Estamos preparando este deck de conversación con todo el contenido y recursos. Vuelve pronto.'
                : locale === 'ar'
                ? 'نحن نحضر مجموعة المحادثات هذه مع كل المحتوى والموارد. عد قريبًا.'
                : 'We are preparing this conversation deck with all content and resources. Check back soon.'}
            </p>
          </ComingSoon>
        </motion.div>
      </Container>
    </MainLayout>
  );
}

