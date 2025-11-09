'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const Banner = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.colors.background.primary};
  border-top: 2px solid ${({ theme }) => theme.colors.brand.primary};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  padding: ${({ theme }) => theme.spacing.xl};
  z-index: ${({ theme }) => theme.zIndices.modal};
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Message = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const LearnMoreLink = styled.a`
  color: ${({ theme }) => theme.colors.brand.primary};
  text-decoration: underline;
  
  &:hover {
    color: ${({ theme }) => theme.colors.brand.accent};
  }
`;

const Actions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-shrink: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    flex-direction: column;
  }
`;

const Button = styled.button<{ $variant: 'primary' | 'secondary' | 'tertiary' }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: ${({ theme, $variant }) => 
    $variant === 'primary' 
      ? 'none' 
      : `2px solid ${theme.colors.brand.primary}`};
  background: ${({ theme, $variant }) => 
    $variant === 'primary' 
      ? theme.colors.brand.primary 
      : $variant === 'secondary'
      ? 'transparent'
      : theme.colors.background.tertiary};
  color: ${({ theme, $variant }) => 
    $variant === 'primary' ? 'white' : theme.colors.brand.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  white-space: nowrap;
  
  &:hover {
    ${({ theme, $variant }) => 
      $variant === 'primary' 
        ? `background: ${theme.colors.brand.accent};`
        : $variant === 'secondary'
        ? `background: ${theme.colors.brand.primary}; color: white;`
        : `background: ${theme.colors.background.secondary};`
    }
  }
`;

export default function ConsentManager() {
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya dio consentimiento
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      // Cargar GTM si hay consentimiento
      loadGTM(consent === 'accepted');
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
    loadGTM(true);
  };

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected');
    setIsVisible(false);
    loadGTM(false);
  };

  const handleCustomize = () => {
    // TODO: Abrir modal de personalización
    alert(locale === 'es' ? 'Personalización próximamente' : locale === 'ar' ? 'التخصيص قريبًا' : 'Customization coming soon');
  };

  const loadGTM = (hasConsent: boolean) => {
    if (!hasConsent) return;

    const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
    if (!GTM_ID) return;

    // Cargar Google Tag Manager
    (function(w: any,d: Document,s: string,l: string,i: string){
      w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s) as HTMLScriptElement,
        dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;
      j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode?.insertBefore(j,f);
    })(window,document,'script','dataLayer',GTM_ID);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <Banner
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3 }}
        >
          <Container>
            <Content>
              <Title>
                {locale === 'es' ? 'Respetamos tu privacidad' : locale === 'ar' ? 'نحترم خصوصيتك' : 'We respect your privacy'}
              </Title>
              <Message>
                {locale === 'es' ? (
                  <>
                    Usamos cookies para mejorar tu experiencia y analizar el tráfico. 
                    {' '}
                    <LearnMoreLink href={`/${locale}/privacy`}>
                      Más información
                    </LearnMoreLink>
                  </>
                ) : locale === 'ar' ? (
                  <>
                    نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل حركة المرور.
                    {' '}
                    <LearnMoreLink href={`/${locale}/privacy`}>
                      معرفة المزيد
                    </LearnMoreLink>
                  </>
                ) : (
                  <>
                    We use cookies to improve your experience and analyze traffic.
                    {' '}
                    <LearnMoreLink href={`/${locale}/privacy`}>
                      Learn more
                    </LearnMoreLink>
                  </>
                )}
              </Message>
            </Content>
            <Actions>
              <Button $variant="primary" onClick={handleAccept}>
                {locale === 'es' ? 'Aceptar' : locale === 'ar' ? 'قبول' : 'Accept'}
              </Button>
              <Button $variant="secondary" onClick={handleReject}>
                {locale === 'es' ? 'Rechazar' : locale === 'ar' ? 'رفض' : 'Reject'}
              </Button>
              <Button $variant="tertiary" onClick={handleCustomize}>
                {locale === 'es' ? 'Personalizar' : locale === 'ar' ? 'تخصيص' : 'Customize'}
              </Button>
            </Actions>
          </Container>
        </Banner>
      )}
    </AnimatePresence>
  );
}

