'use client';

import Link from 'next/link';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
`;

const DeckCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const DeckTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DeckDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DeckMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export default function ConversationsPage() {
  const locale = useLocale();

  const decks = [
    {
      id: '1',
      slug: 'why-god-asks-worship',
      title: locale === 'es' ? '¿Por qué Dios pide que lo adoremos?' : locale === 'ar' ? 'لماذا يطلب الله أن نعبده؟' : 'Why Does God Ask People to Worship Him?',
      description: locale === 'es'
        ? 'Una conversación profunda sobre el propósito de la adoración y la relación entre el ser humano y su Creador.'
        : locale === 'ar'
        ? 'محادثة عميقة حول غرض العبادة والعلاقة بين الإنسان وخالقه.'
        : 'A deep conversation about the purpose of worship and the relationship between humans and their Creator.',
      cards: 12,
      duration: locale === 'es' ? '45 min' : locale === 'ar' ? '45 دقيقة' : '45 min',
    },
    {
      id: '2',
      slug: 'ethics-without-islam',
      title: locale === 'es' ? '¿Necesitamos el Islam para ser éticos?' : locale === 'ar' ? 'هل نحتاج الإسلام لنكون أخلاقيين؟' : 'Do We Need Islam to Be Ethical?',
      description: locale === 'es'
        ? 'Explora por qué los humanos necesitan guía ética revelada y el rol transformador de la revelación.'
        : locale === 'ar'
        ? 'استكشف لماذا يحتاج البشر إلى إرشاد أخلاقي موحى ودور الوحي التحويلي.'
        : 'Explore why humans need revealed ethical guidance and the transformative role of revelation.',
      cards: 15,
      duration: locale === 'es' ? '60 min' : locale === 'ar' ? '60 دقيقة' : '60 min',
    },
    {
      id: '3',
      slug: 'problem-of-evil',
      title: locale === 'es' ? 'El Problema del Mal' : locale === 'ar' ? 'مشكلة الشر' : 'The Problem of Evil',
      description: locale === 'es'
        ? '¿Cómo puede coexistir el mal con un Dios misericordioso? Una exploración de las teodiceas islámicas.'
        : locale === 'ar'
        ? 'كيف يمكن أن يتعايش الشر مع إله رحيم؟ استكشاف للنظريات الإسلامية.'
        : 'How can evil coexist with a merciful God? An exploration of Islamic theodicies.',
      cards: 18,
      duration: locale === 'es' ? '75 min' : locale === 'ar' ? '75 دقيقة' : '75 min',
    },
  ];

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>
            {locale === 'es' ? 'Conversaciones' : locale === 'ar' ? 'محادثات' : 'Conversations'}
          </Title>
          <Subtitle>
            {locale === 'es'
              ? 'Conversaciones educativas con tarjetas simples diseñadas para traer claridad y perspectiva a discusiones de fe'
              : locale === 'ar'
              ? 'محادثات تعليمية ببطاقات بسيطة مصممة لجلب الوضوح والعمق لمناقشات الإيمان'
              : 'Educational conversations with simple card decks designed to bring clarity and perspective to faith discussions'}
          </Subtitle>
        </Header>

        <Grid>
          {decks.map((deck, index) => (
            <Link key={deck.id} href={`/${locale}/learn/conversations/${deck.slug}`} style={{ textDecoration: 'none' }}>
              <DeckCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <DeckTitle>{deck.title}</DeckTitle>
                <DeckDescription>{deck.description}</DeckDescription>
                <DeckMeta>
                  <span>{deck.cards} {locale === 'es' ? 'tarjetas' : locale === 'ar' ? 'بطاقة' : 'cards'}</span>
                  <span>•</span>
                  <span>{deck.duration}</span>
                </DeckMeta>
              </DeckCard>
            </Link>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
}

