'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const NewsletterSection = styled.section`
  background: ${({ theme }) => theme.colors.background.secondary};
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
  position: relative;
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.md};
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 2%, transparent 2%),
                      radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 2%, transparent 2%);
    background-size: 80px 80px;
    opacity: 0.3;
  }
`;

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
  text-align: center;
  position: relative;
  z-index: 1;
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
  }
`;

const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
`;

const Form = styled.form`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: 500px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  background: white;
  color: ${({ theme }) => theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  transition: all ${({ theme }) => theme.transitions.base};
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primary}20;
  }
`;

const SubmitButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  white-space: nowrap;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brand.accent};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Message = styled(motion.div)<{ $type: 'success' | 'error' }>`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ $type }) => $type === 'success' ? 'rgba(72, 187, 120, 0.2)' : 'rgba(245, 101, 101, 0.2)'};
  border: 2px solid ${({ $type }) => $type === 'success' ? 'rgba(72, 187, 120, 0.5)' : 'rgba(245, 101, 101, 0.5)'};
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
`;

const SmallPrint = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

export default function Newsletter() {
  const locale = useLocale();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      // TODO: Integrar con servicio de email marketing (Mailchimp, Brevo, etc.)
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, locale }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <NewsletterSection>
      <Container>
        <Title>
          {locale === 'es' ? 'El Minarete - Newsletter' : locale === 'ar' ? 'المئذنة - النشرة' : 'The Minaret - Newsletter'}
        </Title>
        <Description>
          {locale === 'es' 
            ? 'Desde El Minarete el Almuédano hace su llamado. Únete a nuestra Newsletter y descubre qué quiere decirte.'
            : locale === 'ar'
            ? 'من المئذنة يؤذن المؤذن. انضم إلى نشرتنا واكتشف ما يريد أن يخبرك.'
            : 'From The Minaret the Muezzin makes his call. Join our Newsletter and discover what he wants to tell you.'}
        </Description>

        <Form onSubmit={handleSubmit}>
          <EmailInput
            type="email"
            placeholder={locale === 'es' ? 'tu@email.com' : 'your@email.com'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
          />
          <SubmitButton type="submit" disabled={isSubmitting}>
            {isSubmitting 
              ? (locale === 'es' ? 'Enviando...' : 'Sending...') 
              : (locale === 'es' ? 'Suscribirse' : 'Subscribe')}
          </SubmitButton>
        </Form>

        {status === 'success' && (
          <Message
            $type="success"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ✅ {locale === 'es' 
              ? '¡Gracias por suscribirte! Revisa tu email para confirmar.' 
              : 'Thanks for subscribing! Check your email to confirm.'}
          </Message>
        )}

        {status === 'error' && (
          <Message
            $type="error"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            ❌ {locale === 'es' 
              ? 'Hubo un error. Inténtalo de nuevo.' 
              : 'There was an error. Please try again.'}
          </Message>
        )}

        <SmallPrint>
          {locale === 'es' 
            ? 'Respetamos tu privacidad. Puedes darte de baja en cualquier momento.'
            : 'We respect your privacy. You can unsubscribe at any time.'}
        </SmallPrint>
      </Container>
    </NewsletterSection>
  );
}

