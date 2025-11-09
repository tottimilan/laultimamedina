'use client';

import { useState } from 'react';
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
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing.lg};
  }
  
  ul {
    list-style: disc;
    padding-left: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Form = styled.form`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing['2xl']};
  border-radius: ${({ theme }) => theme.radii.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primary}20;
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  min-height: 120px;
  font-family: inherit;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primary}20;
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brand.accent};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function ScholarshipPage() {
  const locale = useLocale();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // TODO: Enviar aplicación
    setTimeout(() => setIsSubmitting(false), 2000);
  };

  return (
    <MainLayout>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header>
            <Title>
              {locale === 'es' ? 'Programa de Becas' : locale === 'ar' ? 'برنامج المنح الدراسية' : 'Scholarship Program'}
            </Title>
            <Subtitle>
              {locale === 'es'
                ? 'Apoyamos a estudiantes musulmanes comprometidos con el conocimiento islámico y la justicia social'
                : locale === 'ar'
                ? 'ندعم الطلاب المسلمين الملتزمين بالمعرفة الإسلامية والعدالة الاجتماعية'
                : 'Supporting Muslim students committed to Islamic knowledge and social justice'}
            </Subtitle>
          </Header>

          <Content>
            {locale === 'es' ? (
              <>
                <h2>Acerca de la Beca</h2>
                <p>
                  Nuestra beca está diseñada para apoyar a estudiantes musulmanes que demuestran 
                  excelencia académica y compromiso con los valores islámicos de conocimiento y justicia.
                </p>

                <h2>Elegibilidad</h2>
                <ul>
                  <li>Ser musulmán practicante</li>
                  <li>Estar matriculado o admitido en una universidad acreditada</li>
                  <li>Tener un promedio académico mínimo de 3.0 (sobre 4.0)</li>
                  <li>Demostrar compromiso con la comunidad musulmana</li>
                  <li>Presentar ensayo sobre tus objetivos y contribución a la comunidad</li>
                </ul>

                <h2>Monto y Duración</h2>
                <p>
                  La beca proporciona apoyo financiero para gastos educativos durante un año académico, 
                  renovable según el rendimiento académico y el compromiso comunitario.
                </p>
              </>
            ) : locale === 'ar' ? (
              <>
                <h2>حول المنحة</h2>
                <p>
                  تم تصميم منحتنا لدعم الطلاب المسلمين الذين يظهرون التميز الأكاديمي والالتزام 
                  بالقيم الإسلامية للمعرفة والعدالة.
                </p>

                <h2>الأهلية</h2>
                <ul>
                  <li>أن تكون مسلمًا ملتزمًا</li>
                  <li>أن تكون مسجلاً أو مقبولاً في جامعة معتمدة</li>
                  <li>أن يكون لديك معدل أكاديمي لا يقل عن 3.0 (من 4.0)</li>
                  <li>إظهار الالتزام بالمجتمع المسلم</li>
                </ul>
              </>
            ) : (
              <>
                <h2>About the Scholarship</h2>
                <p>
                  Our scholarship is designed to support Muslim students who demonstrate academic 
                  excellence and commitment to Islamic values of knowledge and justice.
                </p>

                <h2>Eligibility</h2>
                <ul>
                  <li>Be a practicing Muslim</li>
                  <li>Be enrolled or admitted to an accredited university</li>
                  <li>Have a minimum GPA of 3.0 (out of 4.0)</li>
                  <li>Demonstrate commitment to the Muslim community</li>
                  <li>Submit essay on goals and community contribution</li>
                </ul>
              </>
            )}
          </Content>

          <Form onSubmit={handleSubmit}>
            <h2 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>
              {locale === 'es' ? 'Aplicar Ahora' : locale === 'ar' ? 'قدم الآن' : 'Apply Now'}
            </h2>
            
            <FormGroup>
              <Label>{locale === 'es' ? 'Nombre completo' : locale === 'ar' ? 'الاسم الكامل' : 'Full name'} *</Label>
              <Input type="text" required />
            </FormGroup>

            <FormGroup>
              <Label>{locale === 'es' ? 'Email' : locale === 'ar' ? 'البريد الإلكتروني' : 'Email'} *</Label>
              <Input type="email" required />
            </FormGroup>

            <FormGroup>
              <Label>{locale === 'es' ? 'Universidad' : locale === 'ar' ? 'الجامعة' : 'University'} *</Label>
              <Input type="text" required />
            </FormGroup>

            <FormGroup>
              <Label>{locale === 'es' ? 'Promedio Académico (GPA)' : locale === 'ar' ? 'المعدل الأكاديمي' : 'GPA'} *</Label>
              <Input type="number" step="0.01" min="0" max="4" required />
            </FormGroup>

            <FormGroup>
              <Label>
                {locale === 'es' ? '¿Por qué mereces esta beca?' : locale === 'ar' ? 'لماذا تستحق هذه المنحة؟' : 'Why do you deserve this scholarship?'} *
              </Label>
              <TextArea required placeholder={locale === 'es' ? 'Comparte tus objetivos y contribución a la comunidad...' : locale === 'ar' ? 'شارك أهدافك ومساهمتك في المجتمع...' : 'Share your goals and community contribution...'} />
            </FormGroup>

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? (locale === 'es' ? 'Enviando...' : locale === 'ar' ? 'جاري الإرسال...' : 'Submitting...') 
                : (locale === 'es' ? 'Enviar Aplicación' : locale === 'ar' ? 'إرسال الطلب' : 'Submit Application')}
            </SubmitButton>
          </Form>
        </motion.div>
      </Container>
    </MainLayout>
  );
}

