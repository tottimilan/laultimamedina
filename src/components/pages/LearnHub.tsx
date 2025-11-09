'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
`;

const ProgramsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
`;

const ProgramCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing['2xl']};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const ProgramTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  letter-spacing: -0.02em;
`;

const ProgramDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ProgramBadge = styled.div`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.brand.primary}10;
  color: ${({ theme }) => theme.colors.brand.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme }) => theme.radii.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default function LearnHub() {
  const t = useTranslations('learn');
  const locale = useLocale();

  const programs = [
    {
      title: t('programs.conversations'),
      badge: locale === 'es' ? 'Interactivo' : locale === 'ar' ? 'تفاعلي' : 'Interactive',
      description: locale === 'es' 
        ? 'Conversaciones educativas con tarjetas diseñadas para discusiones de fe con claridad y perspectiva'
        : locale === 'ar'
        ? 'محادثات تعليمية مع بطاقات مصممة لمناقشات الإيمان بوضوح وعمق'
        : 'Educational conversations with cards designed for faith discussions with clarity and perspective',
      href: `/${locale}/learn/conversations`,
    },
    {
      title: t('programs.convictionCircles'),
      badge: locale === 'es' ? 'Avanzado' : locale === 'ar' ? 'متقدم' : 'Advanced',
      description: locale === 'es'
        ? 'Discusiones grupales profundas e intelectuales sobre temas desafiantes de fe'
        : locale === 'ar'
        ? 'مناقشات جماعية عميقة وفكرية حول قضايا الإيمان الصعبة'
        : 'Deep intellectual group discussions on challenging faith topics',
      href: `/${locale}/learn/conviction-circles`,
    },
    {
      title: t('programs.curriculum'),
      badge: locale === 'es' ? 'Estructurado' : locale === 'ar' ? 'منظم' : 'Structured',
      description: locale === 'es'
        ? 'Planes de lecciones profundos sobre temas de fe para jóvenes musulmanes'
        : locale === 'ar'
        ? 'خطط دروس عميقة حول قضايا الإيمان للشباب المسلم'
        : 'Deep lesson plans on faith issues for Muslim youth',
      href: `/${locale}/learn/curriculum`,
    },
    {
      title: t('programs.talkToolkits'),
      badge: locale === 'es' ? 'Recursos' : locale === 'ar' ? 'موارد' : 'Resources',
      description: locale === 'es'
        ? 'Da charlas con facilidad usando recursos auténticos, bien investigados y pre-preparados'
        : locale === 'ar'
        ? 'ألقِ محاضرات بسهولة باستخدام موارد أصيلة ومدروسة ومعدة مسبقًا'
        : 'Deliver talks with ease using authentic, well-researched, pre-prepared resources',
      href: `/${locale}/learn/talk-toolkits`,
    },
    {
      title: t('programs.wisayQa'),
      badge: locale === 'es' ? 'Q&A' : locale === 'ar' ? 'أسئلة' : 'Q&A',
      description: locale === 'es'
        ? 'Catálogo completo de respuestas a preguntas comunes sobre el Islam'
        : locale === 'ar'
        ? 'كتالوج كامل للإجابات على الأسئلة الشائعة حول الإسلام'
        : 'Complete catalogue of answers to common questions about Islam',
      href: `/${locale}/learn/wisay-qa`,
    },
  ];

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>{t('title')}</Title>
          <Subtitle>{t('subtitle')}</Subtitle>
        </Header>

        <ProgramsGrid>
          {programs.map((program, index) => (
            <Link key={program.href} href={program.href} style={{ textDecoration: 'none' }}>
              <ProgramCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <ProgramBadge>{program.badge}</ProgramBadge>
                <ProgramTitle>{program.title}</ProgramTitle>
                <ProgramDescription>{program.description}</ProgramDescription>
              </ProgramCard>
            </Link>
          ))}
        </ProgramsGrid>
      </Container>
    </MainLayout>
  );
}

