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
  max-width: 800px;
  margin: 0 auto ${({ theme }) => theme.spacing['3xl']};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const UnitsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.xl};
`;

const UnitCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const UnitNumber = styled.div`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.brand.primary}15;
  color: ${({ theme }) => theme.colors.brand.primary};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme }) => theme.radii.sm};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
`;

const UnitTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const UnitMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const UnitDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export default function CurriculumPage() {
  const locale = useLocale();

  const units = [
    {
      id: '1',
      slug: 'ethics-of-desire',
      number: 1,
      title: locale === 'es' ? 'Amor a primera vista: Ética del deseo' : locale === 'ar' ? 'الحب من النظرة الأولى: أخلاق الرغبة' : 'Love at first sight: Ethics of desire',
      grade: locale === 'es' ? 'Grados 9-12' : locale === 'ar' ? 'الصفوف 9-12' : 'Grades 9-12',
      duration: locale === 'es' ? '6 semanas' : locale === 'ar' ? '6 أسابيع' : '6 weeks',
      description: locale === 'es'
        ? 'Explora la naturaleza de los deseos sexuales en el Islam y cómo manejarlos responsablemente.'
        : locale === 'ar'
        ? 'استكشف طبيعة الرغبات الجنسية في الإسلام وكيفية إدارتها بمسؤولية.'
        : 'Explore the nature of sexual desires in Islam and how to manage them responsibly.',
    },
    {
      id: '2',
      slug: 'fasting-and-zakat',
      number: 2,
      title: locale === 'es' ? 'Ayuno y zakat: Ganar a través del sacrificio' : locale === 'ar' ? 'الصيام والزكاة: الفوز بالتضحية' : 'Fasting and zakat: Winning through sacrifice',
      grade: locale === 'es' ? 'Grados 6-9' : locale === 'ar' ? 'الصفوف 6-9' : 'Grades 6-9',
      duration: locale === 'es' ? '5 semanas' : locale === 'ar' ? '5 أسابيع' : '5 weeks',
      description: locale === 'es'
        ? 'Comprende cómo el zakat y el ayuno fomentan la purificación espiritual y la autodisciplina.'
        : locale === 'ar'
        ? 'فهم كيف تعزز الزكاة والصيام التطهير الروحي والانضباط الذاتي.'
        : 'Understand how zakat and fasting foster spiritual purification and self-discipline.',
    },
    {
      id: '3',
      slug: 'divine-decree',
      number: 3,
      title: locale === 'es' ? 'Decreto divino en el Islam' : locale === 'ar' ? 'القدر الإلهي في الإسلام' : 'Divine decree in Islam',
      grade: locale === 'es' ? 'Grados 10-12' : locale === 'ar' ? 'الصفوف 10-12' : 'Grades 10-12',
      duration: locale === 'es' ? '4 semanas' : locale === 'ar' ? '4 أسابيع' : '4 weeks',
      description: locale === 'es'
        ? 'Explora el discurso coránico sobre la predestinación y el libre albedrío.'
        : locale === 'ar'
        ? 'استكشف الخطاب القرآني حول القدر والإرادة الحرة.'
        : 'Explore Quranic discourse on predestination and free will.',
    },
  ];

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>
            {locale === 'es' ? 'Currículo Educativo' : locale === 'ar' ? 'المنهج التعليمي' : 'Educational Curriculum'}
          </Title>
          <Subtitle>
            {locale === 'es'
              ? 'Planes de lecciones estructurados sobre temas de fe, específicamente diseñados para jóvenes musulmanes de hoy. Cada unidad incluye objetivos de aprendizaje, actividades y evaluaciones.'
              : locale === 'ar'
              ? 'خطط دروس منظمة حول قضايا الإيمان، مصممة خصيصًا للشباب المسلم اليوم. تتضمن كل وحدة أهداف تعلم وأنشطة وتقييمات.'
              : 'Structured lesson plans on faith issues, specifically designed for Muslim youth today. Each unit includes learning objectives, activities, and assessments.'}
          </Subtitle>
        </Header>

        <UnitsGrid>
          {units.map((unit, index) => (
            <Link key={unit.id} href={`/${locale}/learn/curriculum/${unit.slug}`} style={{ textDecoration: 'none' }}>
              <UnitCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <UnitNumber>
                  {locale === 'es' ? 'Unidad' : locale === 'ar' ? 'الوحدة' : 'Unit'} {unit.number}
                </UnitNumber>
                <UnitTitle>{unit.title}</UnitTitle>
                <UnitMeta>
                  <span>{unit.grade}</span>
                  <span>•</span>
                  <span>{unit.duration}</span>
                </UnitMeta>
                <UnitDescription>{unit.description}</UnitDescription>
              </UnitCard>
            </Link>
          ))}
        </UnitsGrid>
      </Container>
    </MainLayout>
  );
}

