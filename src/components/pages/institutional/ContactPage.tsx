'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 800px;
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
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xl};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primary}20;
  }
`;

const TextArea = styled.textarea`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-family: inherit;
  min-height: 150px;
  resize: vertical;
  transition: all ${({ theme }) => theme.transitions.base};
  
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
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brand.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.status.success}20;
  border: 2px solid ${({ theme }) => theme.colors.status.success};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.status.success};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const ErrorMessage = styled(motion.div)`
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.status.error}20;
  border: 2px solid ${({ theme }) => theme.colors.status.error};
  border-radius: ${({ theme }) => theme.radii.lg};
  color: ${({ theme }) => theme.colors.status.error};
  text-align: center;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const ContactInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: center;
`;

export default function ContactPage() {
  const t = useTranslations('contact');
  const tValidation = useTranslations('validation');
  const locale = useLocale();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Integrar con API de email
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, locale }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
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
            <Title>{t('title')}</Title>
            <Subtitle>{t('subtitle')}</Subtitle>
          </Header>

          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label htmlFor="name">{t('name')} *</Label>
              <Input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={locale === 'es' ? 'Tu nombre completo' : 'Your full name'}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email">{t('email')} *</Label>
              <Input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="correo@ejemplo.com"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="subject">{t('subject')} *</Label>
              <Input
                id="subject"
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={locale === 'es' ? 'Asunto de tu mensaje' : 'Subject of your message'}
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">{t('message')} *</Label>
              <TextArea
                id="message"
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder={locale === 'es' ? 'Escribe tu mensaje aquí...' : 'Write your message here...'}
              />
            </FormGroup>

            {submitStatus === 'success' && (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ✅ {t('success')}
              </SuccessMessage>
            )}

            {submitStatus === 'error' && (
              <ErrorMessage
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                ❌ {t('error')}
              </ErrorMessage>
            )}

            <SubmitButton type="submit" disabled={isSubmitting}>
              {isSubmitting 
                ? (locale === 'es' ? 'Enviando...' : 'Sending...') 
                : t('send')}
            </SubmitButton>
          </Form>

          <ContactInfo>
            <h3 style={{ marginBottom: '1rem' }}>
              {locale === 'es' ? 'Otras formas de contacto' : 'Other ways to contact us'}
            </h3>
            <p style={{ color: '#718096' }}>
              📧 info@laultimamedina.org<br />
              🐦 @laultimamedina<br />
              📍 {locale === 'es' ? 'En línea, sirviendo a la comunidad global' : 'Online, serving the global community'}
            </p>
          </ContactInfo>
        </motion.div>
      </Container>
    </MainLayout>
  );
}

