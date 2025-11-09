'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background: ${({ theme }) => theme.colors.brand.dark};
  color: ${({ theme }) => theme.colors.text.inverse};
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing['2xl']} ${({ theme }) => theme.spacing.md};
  }
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const FooterTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.brand.secondary};
`;

const FooterLink = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  opacity: 0.8;
  transition: opacity ${({ theme }) => theme.transitions.base};
  
  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.brand.secondary};
  }
`;

const FooterBottom = styled.div`
  padding-top: ${({ theme }) => theme.spacing.xl};
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.7;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.md};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: rgba(255, 255, 255, 0.1);
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.secondary};
    transform: translateY(-2px);
  }
`;

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          {/* Acerca de */}
          <FooterSection>
            <FooterTitle>{t('about')}</FooterTitle>
            <FooterLink href={`/${locale}/about/mission`}>
              {t('mission')}
            </FooterLink>
            <FooterLink href={`/${locale}/about/scholarly-rigor`}>
              {t('scholarlyRigor')}
            </FooterLink>
            <FooterLink href={`/${locale}/about/fundraising`}>
              {t('fundraisingPhilosophy')}
            </FooterLink>
            <FooterLink href={`/${locale}/about/annual-reports`}>
              {t('annualReports')}
            </FooterLink>
          </FooterSection>

          {/* Políticas */}
          <FooterSection>
            <FooterTitle>{t('policies')}</FooterTitle>
            <FooterLink href={`/${locale}/privacy`}>
              {t('privacy')}
            </FooterLink>
            <FooterLink href={`/${locale}/politica-general`}>
              {locale === 'es' ? 'Política General' : locale === 'ar' ? 'السياسة العامة' : 'General Policy'}
            </FooterLink>
            <FooterLink href={`/${locale}/politica-cookies`}>
              {locale === 'es' ? 'Política de Cookies' : locale === 'ar' ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}
            </FooterLink>
          </FooterSection>

          {/* Comunidad */}
          <FooterSection>
            <FooterTitle>
              {locale === 'es' ? 'Comunidad' : locale === 'ar' ? 'المجتمع' : 'Community'}
            </FooterTitle>
            <FooterLink href={`/${locale}/about/mission`}>
              {locale === 'es' ? 'Nosotros' : locale === 'ar' ? 'من نحن' : 'About Us'}
            </FooterLink>
            <FooterLink href={`/${locale}/volunteer`}>
              {t('volunteer')}
            </FooterLink>
            <FooterLink href={`/${locale}/el-zoco`}>
              {locale === 'es' ? 'El Zoco' : locale === 'ar' ? 'السوق' : 'The Souk'}
            </FooterLink>
          </FooterSection>

          {/* Participa */}
          <FooterSection>
            <FooterTitle>{t('careers')}</FooterTitle>
            <FooterLink href={`/${locale}/careers`}>
              {t('careers')}
            </FooterLink>
            <FooterLink href={`/${locale}/volunteer`}>
              {t('volunteer')}
            </FooterLink>
            <FooterLink href={`/${locale}/contact`}>
              {t('contact')}
            </FooterLink>
          </FooterSection>

          {/* Redes Sociales */}
          <FooterSection>
            <FooterTitle>{t('followUs')}</FooterTitle>
            <SocialLinks>
              <SocialLink
                href="https://www.youtube.com/@laultimamedina"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <span>▶</span>
              </SocialLink>
              <SocialLink
                href="https://open.spotify.com/show/laultimamedina"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Spotify"
              >
                <span>♫</span>
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/laultimamedina"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <span>IG</span>
              </SocialLink>
            </SocialLinks>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', opacity: 0.8 }}>
              laultimamedina@gmail.com
            </p>
          </FooterSection>
        </FooterGrid>

        <FooterBottom>
          © {currentYear} La Última Medina. {t('allRightsReserved')}.
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
}

