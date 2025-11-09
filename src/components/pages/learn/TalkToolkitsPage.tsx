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
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const ToolkitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const ToolkitCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing['2xl']};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const ToolkitTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const ToolkitDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ToolkitMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const Badge = styled.span`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.brand.secondary};
  color: ${({ theme }) => theme.colors.brand.dark};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme }) => theme.radii.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export default function TalkToolkitsPage() {
  const locale = useLocale();

  const toolkits = [
    {
      id: '1',
      slug: 'fundamentals-of-islam',
      title: locale === 'es' ? 'Los Fundamentos del Islam' : locale === 'ar' ? 'أسس الإسلام' : 'Fundamentals of Islam',
      description: locale === 'es'
        ? 'Kit completo para dar una charla introductoria sobre los pilares del Islam, con diapositivas, guión y recursos visuales.'
        : locale === 'ar'
        ? 'مجموعة كاملة لإلقاء محاضرة تمهيدية عن أركان الإسلام، مع الشرائح والنص والموارد البصرية.'
        : 'Complete kit to give an introductory talk on the pillars of Islam, with slides, script and visual resources.',
      duration: locale === 'es' ? '45-60 min' : locale === 'ar' ? '45-60 دقيقة' : '45-60 min',
      difficulty: locale === 'es' ? 'Principiante' : locale === 'ar' ? 'مبتدئ' : 'Beginner',
      includes: locale === 'es' ? 'Slides + Script + Q&A' : locale === 'ar' ? 'شرائح + نص + أسئلة وأجوبة' : 'Slides + Script + Q&A',
    },
    {
      id: '2',
      slug: 'prophet-muhammad',
      title: locale === 'es' ? 'El Profeta Muhammad ﷺ' : locale === 'ar' ? 'النبي محمد ﷺ' : 'Prophet Muhammad ﷺ',
      description: locale === 'es'
        ? 'Presentación completa sobre la vida, enseñanzas y ejemplo del Profeta Muhammad ﷺ. Ideal para conferencias de 1 hora.'
        : locale === 'ar'
        ? 'عرض كامل عن حياة وتعاليم ومثال النبي محمد ﷺ. مثالي لمحاضرات ساعة واحدة.'
        : 'Complete presentation on the life, teachings and example of Prophet Muhammad ﷺ. Ideal for 1-hour lectures.',
      duration: locale === 'es' ? '60-90 min' : locale === 'ar' ? '60-90 دقيقة' : '60-90 min',
      difficulty: locale === 'es' ? 'Intermedio' : locale === 'ar' ? 'متوسط' : 'Intermediate',
      includes: locale === 'es' ? 'Slides + Script + Vídeos' : locale === 'ar' ? 'شرائح + نص + فيديوهات' : 'Slides + Script + Videos',
    },
  ];

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>
            {locale === 'es' ? 'Herramientas para Charlas' : locale === 'ar' ? 'أدوات المحاضرات' : 'Talk Toolkits'}
          </Title>
          <Subtitle>
            {locale === 'es'
              ? 'Da charlas con facilidad usando recursos auténticos, bien investigados y pre-preparados. Cada toolkit incluye diapositivas, guión detallado y materiales de apoyo.'
              : locale === 'ar'
              ? 'ألقِ محاضرات بسهولة باستخدام موارد أصيلة ومدروسة جيدًا ومعدة مسبقًا. تتضمن كل مجموعة شرائح ونصًا مفصلاً ومواد داعمة.'
              : 'Deliver talks with ease using authentic, well-researched, pre-prepared resources. Each toolkit includes slides, detailed script and supporting materials.'}
          </Subtitle>
        </Header>

        <ToolkitsGrid>
          {toolkits.map((toolkit, index) => (
            <Link key={toolkit.id} href={`/${locale}/learn/talk-toolkits/${toolkit.slug}`} style={{ textDecoration: 'none' }}>
              <ToolkitCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <div style={{ marginBottom: '1rem' }}>
                  <Badge>{toolkit.difficulty}</Badge>
                </div>
                <ToolkitTitle>{toolkit.title}</ToolkitTitle>
                <ToolkitDescription>{toolkit.description}</ToolkitDescription>
                <ToolkitMeta>
                  <span>{toolkit.duration}</span>
                  <span>•</span>
                  <span>{toolkit.includes}</span>
                </ToolkitMeta>
              </ToolkitCard>
            </Link>
          ))}
        </ToolkitsGrid>
      </Container>
    </MainLayout>
  );
}

