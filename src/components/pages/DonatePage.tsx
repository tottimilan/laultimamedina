'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 900px;
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

const DonationCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 2px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing['3xl']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
`;

const TypeSelector = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  padding: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const TypeButton = styled.button<{ $isActive: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : 'transparent'};
  color: ${({ theme, $isActive }) => 
    $isActive ? 'white' : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    ${({ theme, $isActive }) => !$isActive && `
      background: ${theme.colors.background.tertiary};
    `}
  }
`;

const AmountsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const AmountButton = styled.button<{ $isSelected: boolean }>`
  padding: ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.brand.primary : theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.brand.primary + '15' : 'transparent'};
  color: ${({ theme, $isSelected }) => 
    $isSelected ? theme.colors.brand.primary : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    background: ${({ theme }) => theme.colors.brand.primary}10;
  }
`;

const CustomAmountInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  border: 2px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primary}20;
  }
`;

const DonateButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border: none;
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brand.secondary};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.xl};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const SecureNotice = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const ImpactSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

const ImpactTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const ImpactList = styled.ul`
  list-style: none;
  padding: 0;
  
  li {
    padding: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
    position: relative;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.brand.primary};
      font-weight: bold;
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }
`;

interface DonatePageProps {
  type: 'one-time' | 'monthly';
}

export default function DonatePage({ type }: DonatePageProps) {
  const t = useTranslations('donate');
  const locale = useLocale();
  
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>(type);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasMatchGift, setHasMatchGift] = useState(false);
  const [companyName, setCompanyName] = useState('');

  const predefinedAmounts = [25, 50, 100, 250];

  const handleDonate = async () => {
    setIsProcessing(true);
    
    const amount = selectedAmount || parseFloat(customAmount);
    
    if (!amount || amount < 5) {
      alert(locale === 'es' ? 'El monto mínimo es 5€' : 'Minimum amount is $5');
      setIsProcessing(false);
      return;
    }

    try {
      // TODO: Integrar con Stripe Checkout
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          type: donationType,
          locale,
          matchGift: hasMatchGift ? { company: companyName } : null,
        }),
      });

      const { url } = await response.json();
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      alert(locale === 'es' ? 'Error al procesar la donación' : 'Error processing donation');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>{t('title')}</Title>
          <Subtitle>{t('subtitle')}</Subtitle>
        </Header>

        <DonationCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TypeSelector>
            <TypeButton
              $isActive={donationType === 'one-time'}
              onClick={() => setDonationType('one-time')}
            >
              {t('oneTime')}
            </TypeButton>
            <TypeButton
              $isActive={donationType === 'monthly'}
              onClick={() => setDonationType('monthly')}
            >
              {t('monthly')}
            </TypeButton>
          </TypeSelector>

          <AmountsGrid>
            {predefinedAmounts.map((amount) => (
              <AmountButton
                key={amount}
                $isSelected={selectedAmount === amount && !customAmount}
                onClick={() => {
                  setSelectedAmount(amount);
                  setCustomAmount('');
                }}
              >
                {amount}€
              </AmountButton>
            ))}
          </AmountsGrid>

          <CustomAmountInput
            type="number"
            placeholder={t('custom')}
            value={customAmount}
            onChange={(e) => {
              setCustomAmount(e.target.value);
              setSelectedAmount(null);
            }}
            min="5"
          />

          <div style={{ marginTop: '1rem', padding: '1rem', background: '#f8faf9', borderRadius: '0.375rem' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input 
                type="checkbox" 
                checked={hasMatchGift}
                onChange={(e) => setHasMatchGift(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              <span style={{ fontWeight: '600' }}>
                {locale === 'es' ? 'Mi empresa duplicará esta donación' : locale === 'ar' ? 'ستضاعف شركتي هذا التبرع' : 'My company will match this donation'}
              </span>
            </label>
            
            {hasMatchGift && (
              <input
                type="text"
                placeholder={locale === 'es' ? 'Nombre de la empresa' : locale === 'ar' ? 'اسم الشركة' : 'Company name'}
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                style={{
                  marginTop: '0.75rem',
                  width: '100%',
                  padding: '0.75rem 1rem',
                  border: '1px solid #cbd2d0',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                }}
              />
            )}
          </div>

          <DonateButton
            onClick={handleDonate}
            disabled={isProcessing || (!selectedAmount && !customAmount)}
          >
            {isProcessing 
              ? (locale === 'es' ? 'Procesando...' : 'Processing...') 
              : t('ctaDonate')}
          </DonateButton>

          <SecureNotice>
            🔒 {t('secure')} • {t('taxDeductible')}
          </SecureNotice>
        </DonationCard>

        <ImpactSection>
          <ImpactTitle>{t('impact')}</ImpactTitle>
          <ImpactList>
            <li>{locale === 'es' ? 'Financia contenido educativo de alta calidad' : 'Funds high-quality educational content'}</li>
            <li>{locale === 'es' ? 'Apoya la investigación académica islámica' : 'Supports Islamic academic research'}</li>
            <li>{locale === 'es' ? 'Hace accesible el conocimiento a todos' : 'Makes knowledge accessible to all'}</li>
            <li>{locale === 'es' ? 'Desarrolla programas educativos innovadores' : 'Develops innovative educational programs'}</li>
          </ImpactList>
        </ImpactSection>
      </Container>
    </MainLayout>
  );
}

