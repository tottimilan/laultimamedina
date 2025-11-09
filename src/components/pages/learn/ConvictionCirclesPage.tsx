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

const CirclesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const CircleCard = styled(motion.div)`
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

const Badge = styled.div`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.brand.primary}15;
  color: ${({ theme }) => theme.colors.brand.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme }) => theme.radii.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const CircleTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const CircleDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const CircleMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

export default function ConvictionCirclesPage() {
  const locale = useLocale();

  const circles = [
    {
      id: '1',
      slug: 'faith-and-reason',
      level: locale === 'es' ? 'Avanzado' : locale === 'ar' ? 'متقدم' : 'Advanced',
      title: locale === 'es' ? 'Fe y Razón en el Islam' : locale === 'ar' ? 'الإيمان والعقل في الإسلام' : 'Faith and Reason in Islam',
      description: locale === 'es'
        ? 'Círculo de discusión sobre la relación entre la fe islámica y el pensamiento racional. Exploramos cómo el Islam abraza tanto la razón como la revelación.'
        : locale === 'ar'
        ? 'دائرة نقاش حول العلاقة بين الإيمان الإسلامي والفكر العقلاني. نستكشف كيف يحتضن الإسلام العقل والوحي.'
        : 'Discussion circle on the relationship between Islamic faith and rational thought. We explore how Islam embraces both reason and revelation.',
      sessions: 8,
      duration: locale === 'es' ? '12 semanas' : locale === 'ar' ? '12 أسبوعًا' : '12 weeks',
    },
    {
      id: '2',
      slug: 'contemporary-ethics',
      level: locale === 'es' ? 'Intermedio' : locale === 'ar' ? 'متوسط' : 'Intermediate',
      title: locale === 'es' ? 'Ética Islámica Contemporánea' : locale === 'ar' ? 'الأخلاق الإسلامية المعاصرة' : 'Contemporary Islamic Ethics',
      description: locale === 'es'
        ? 'Análisis profundo de dilemas éticos modernos desde una perspectiva islámica. Tecnología, medio ambiente, justicia social y más.'
        : locale === 'ar'
        ? 'تحليل عميق للمعضلات الأخلاقية الحديثة من منظور إسلامي. التكنولوجيا والبيئة والعدالة الاجتماعية وغيرها.'
        : 'Deep analysis of modern ethical dilemmas from an Islamic perspective. Technology, environment, social justice and more.',
      sessions: 10,
      duration: locale === 'es' ? '10 semanas' : locale === 'ar' ? '10 أسابيع' : '10 weeks',
    },
  ];

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>
            {locale === 'es' ? 'Círculos de Convicción' : locale === 'ar' ? 'دوائر الإيمان' : 'Conviction Circles'}
          </Title>
          <Subtitle>
            {locale === 'es'
              ? 'Discusiones grupales profundas e intelectuales sobre temas desafiantes de fe. Un espacio para explorar preguntas difíciles con rigor académico y apertura intelectual.'
              : locale === 'ar'
              ? 'مناقشات جماعية عميقة وفكرية حول قضايا الإيمان الصعبة. مساحة لاستكشاف الأسئلة الصعبة بدقة أكاديمية وانفتاح فكري.'
              : 'Deep intellectual group discussions on challenging faith topics. A space to explore difficult questions with academic rigor and intellectual openness.'}
          </Subtitle>
        </Header>

        <CirclesGrid>
          {circles.map((circle, index) => (
            <Link key={circle.id} href={`/${locale}/learn/conviction-circles/${circle.slug}`} style={{ textDecoration: 'none' }}>
              <CircleCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Badge>{circle.level}</Badge>
                <CircleTitle>{circle.title}</CircleTitle>
                <CircleDescription>{circle.description}</CircleDescription>
                <CircleMeta>
                  <span>{circle.sessions} {locale === 'es' ? 'sesiones' : locale === 'ar' ? 'جلسات' : 'sessions'}</span>
                  <span>•</span>
                  <span>{circle.duration}</span>
                </CircleMeta>
              </CircleCard>
            </Link>
          ))}
        </CirclesGrid>
      </Container>
    </MainLayout>
  );
}

