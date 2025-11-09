'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1280px;
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
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
`;

const Filters = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  flex-wrap: wrap;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : theme.colors.border.medium};
  background: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : 'white'};
  color: ${({ theme, $isActive }) => 
    $isActive ? 'white' : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    ${({ $isActive, theme }) => !$isActive && `
      background: ${theme.colors.brand.primary}10;
    `}
  }
`;

const JobsGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const JobCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing['2xl']};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const JobHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
`;

const JobInfo = styled.div`
  flex: 1;
`;

const JobTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const JobMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-wrap: wrap;
`;

const ApplyButton = styled(Link)`
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

const JobDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${({ theme }) => theme.spacing['5xl']} ${({ theme }) => theme.spacing.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const VolunteerSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing['5xl']};
  padding: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: center;
`;

export default function CareersPage() {
  const t = useTranslations('careers');
  const locale = useLocale();
  const [activeFilter, setActiveFilter] = useState('all');

  // Mock data - en producción vendrá de Strapi
  const jobs = [
    {
      id: '1',
      title: locale === 'es' ? 'Investigador Islámico Senior' : locale === 'ar' ? 'باحث إسلامي أول' : 'Senior Islamic Researcher',
      department: locale === 'es' ? 'Educación' : locale === 'ar' ? 'التعليم' : 'Education',
      location: locale === 'es' ? 'Remoto' : locale === 'ar' ? 'عن بعد' : 'Remote',
      type: 'full-time',
      description: locale === 'es' 
        ? 'Buscamos un investigador islámico con experiencia para producir contenido académico de alta calidad sobre temas contemporáneos del Islam.'
        : locale === 'ar'
        ? 'نبحث عن باحث إسلامي ذو خبرة لإنتاج محتوى أكاديمي عالي الجودة حول القضايا الإسلامية المعاصرة.'
        : 'We are looking for an experienced Islamic researcher to produce high-quality academic content on contemporary Islamic topics.',
      slug: 'investigador-islamico-senior',
    },
    {
      id: '2',
      title: locale === 'es' ? 'Editor de Contenido' : locale === 'ar' ? 'محرر محتوى' : 'Content Editor',
      department: locale === 'es' ? 'Medios' : locale === 'ar' ? 'الإعلام' : 'Media',
      location: locale === 'es' ? 'Remoto' : locale === 'ar' ? 'عن بعد' : 'Remote',
      type: 'full-time',
      description: locale === 'es'
        ? 'Responsable de revisar y editar todo el contenido antes de su publicación, asegurando calidad y coherencia.'
        : locale === 'ar'
        ? 'مسؤول عن مراجعة وتحرير جميع المحتوى قبل نشره، وضمان الجودة والاتساق.'
        : 'Responsible for reviewing and editing all content before publication, ensuring quality and consistency.',
      slug: 'editor-contenido',
    },
  ];

  const departments = [
    { value: 'all', label: t('departments.all') },
    { value: 'education', label: t('departments.education') },
    { value: 'media', label: t('departments.media') },
    { value: 'operations', label: t('departments.operations') },
    { value: 'fundraising', label: t('departments.fundraising') },
  ];

  const filteredJobs = activeFilter === 'all' 
    ? jobs 
    : jobs.filter(job => job.department.toLowerCase() === activeFilter);

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>{t('title')}</Title>
          <Subtitle>{t('subtitle')}</Subtitle>
        </Header>

        <Filters>
          {departments.map((dept) => (
            <FilterButton
              key={dept.value}
              $isActive={activeFilter === dept.value}
              onClick={() => setActiveFilter(dept.value)}
            >
              {dept.label}
            </FilterButton>
          ))}
        </Filters>

        {filteredJobs.length > 0 ? (
          <JobsGrid>
            {filteredJobs.map((job, index) => (
              <JobCard
                key={job.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <JobHeader>
                  <JobInfo>
                    <JobTitle>{job.title}</JobTitle>
                    <JobMeta>
                      <span>{job.department}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>
                        {job.type === 'full-time' 
                          ? (locale === 'es' ? 'Tiempo completo' : locale === 'ar' ? 'دوام كامل' : 'Full-time')
                          : (locale === 'es' ? 'Medio tiempo' : locale === 'ar' ? 'دوام جزئي' : 'Part-time')}
                      </span>
                    </JobMeta>
                  </JobInfo>
                  <ApplyButton href={`/${locale}/careers/${job.slug}`}>
                    {t('applyNow')}
                  </ApplyButton>
                </JobHeader>
                <JobDescription>{job.description}</JobDescription>
              </JobCard>
            ))}
          </JobsGrid>
        ) : (
          <EmptyState>
            <p>{t('noPositions')}</p>
          </EmptyState>
        )}

        <VolunteerSection>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            {t('volunteer')}
          </h2>
          <p style={{ fontSize: '1.125rem', color: '#4a5568', marginBottom: '2rem', maxWidth: '700px', margin: '0 auto 2rem' }}>
            {locale === 'es'
              ? 'Si no puedes unirte a tiempo completo, siempre valoramos la ayuda de voluntarios comprometidos.'
              : locale === 'ar'
              ? 'إذا كنت لا تستطيع الانضمام بدوام كامل، فنحن نقدر دائمًا مساعدة المتطوعين الملتزمين.'
              : 'If you can\'t join full-time, we always value the help of committed volunteers.'}
          </p>
          <ApplyButton href={`/${locale}/volunteer`}>
            {locale === 'es' ? 'Conocer más sobre Voluntariado' : locale === 'ar' ? 'معرفة المزيد عن التطوع' : 'Learn About Volunteering'}
          </ApplyButton>
        </VolunteerSection>
      </Container>
    </MainLayout>
  );
}

