'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import styled from 'styled-components';
import { locales, localeNames } from '@/i18n';

const HeaderContainer = styled.header`
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndices.sticky};
  background: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const HeaderContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  }
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  
  img {
    height: 50px;
    width: auto;
  }
  
  &:hover {
    opacity: 0.9;
  }
`;

const Nav = styled.nav<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    flex-direction: column;
    background: ${({ theme }) => theme.colors.background.primary};
    padding: ${({ theme }) => theme.spacing.xl};
    box-shadow: ${({ theme }) => theme.shadows.xl};
    z-index: ${({ theme }) => theme.zIndices.dropdown};
    gap: ${({ theme }) => theme.spacing.md};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
    transform: ${({ $isOpen }) => ($isOpen ? 'translateX(0)' : 'translateX(100%)')};
    transition: all ${({ theme }) => theme.transitions.base};
    overflow-y: auto;
    align-items: stretch;
    justify-content: flex-start;
  }
`;

const MobileMenuButton = styled.button<{ $isOpen?: boolean }>`
  display: none;
  flex-direction: column;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: all ${({ theme }) => theme.transitions.base};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  span {
    width: 24px;
    height: 2px;
    background: ${({ theme }) => theme.colors.brand.primary};
    transition: all ${({ theme }) => theme.transitions.base};
    transform-origin: center;

    &:nth-child(1) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(45deg) translate(6px, 6px)' : 'none'};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => $isOpen ? '0' : '1'};
      transform: ${({ $isOpen }) => $isOpen ? 'translateX(20px)' : 'none'};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) => $isOpen ? 'rotate(-45deg) translate(6px, -6px)' : 'none'};
    }
  }
`;

const NavLink = styled(Link)<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.brand.primary : theme.colors.text.primary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
    background: ${({ theme }) => theme.colors.background.secondary};
    transform: translateX(4px);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radii.lg};
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const DonateButton = styled(Link)`
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.colors.brand.secondary};
    transform: translateY(-1px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
    border-radius: ${({ theme }) => theme.radii.lg};
    margin-top: ${({ theme }) => theme.spacing.md};
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const LocaleSwitcher = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding-left: ${({ theme }) => theme.spacing.lg};
  border-left: 1px solid ${({ theme }) => theme.colors.border.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 0;
    padding-left: 0;
    border-left: none;
    margin-top: ${({ theme }) => theme.spacing.lg};
    padding: ${({ theme }) => theme.spacing.md};
    background: ${({ theme }) => theme.colors.background.secondary};
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`;

const LocaleButton = styled(Link)<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.brand.primary : theme.colors.text.secondary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  transition: all ${({ theme }) => theme.transitions.base};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
    background: ${({ theme }) => theme.colors.background.secondary};
    transform: scale(1.05);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radii.md};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    background: white;
    box-shadow: ${({ theme }) => theme.shadows.sm};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

const MobileMenuSection = styled.div`
  display: none;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: flex;

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const MobileMenuDivider = styled.div`
  display: none;
  height: 1px;
  background: ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => theme.spacing.md} 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: block;
  }
`;

const DropdownContainer = styled.div`
  position: relative;
`;

const DropdownTrigger = styled.div<{ $isActive?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.brand.primary : theme.colors.text.primary};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.radii.md};
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};

  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
    background: ${({ theme }) => theme.colors.background.secondary};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
    border-radius: ${({ theme }) => theme.radii.lg};
    justify-content: center;
    margin-bottom: ${({ theme }) => theme.spacing.xs};
  }
`;

const DropdownMenu = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: ${({ theme }) => theme.spacing.xs};
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  min-width: 200px;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transform: translateY(${({ $isOpen }) => ($isOpen ? '0' : '-10px')});
  transition: all ${({ theme }) => theme.transitions.base};
`;

const DropdownItem = styled(Link)`
  display: block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
    color: ${({ theme }) => theme.colors.brand.primary};
  }

  &:not(:last-child) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.base};
    padding: ${({ theme }) => theme.spacing.md};
    border-radius: ${({ theme }) => theme.radii.md};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    background: white;
    box-shadow: ${({ theme }) => theme.shadows.sm};
    text-align: center;
  }
`;

const MobileOverlay = styled.div<{ $isOpen?: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: ${({ theme }) => theme.zIndices.overlay};
    backdrop-filter: blur(2px);
  }
`;

const DesktopActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export default function Header() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isCommunityOpen, setIsCommunityOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Extraer la ruta sin el locale para comparación
  const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/';

  // Obtener la ruta en el locale alternativo
  const getAlternateLocalePath = (targetLocale: string) => {
    return pathname.replace(`/${locale}`, `/${targetLocale}`);
  };

  return (
    <HeaderContainer>
      <MobileOverlay
        $isOpen={isMobileMenuOpen}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <HeaderContent>
        <Logo href={`/${locale}`}>
          <img src="/logo.webp" alt="La Última Medina" />
        </Logo>

        <MobileMenuButton
          $isOpen={isMobileMenuOpen}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </MobileMenuButton>

        <Nav $isOpen={isMobileMenuOpen}>
          {/* Elementos principales de navegación - visibles tanto en desktop como móvil */}
          <DropdownContainer
            onMouseEnter={() => setIsCommunityOpen(true)}
            onMouseLeave={() => setIsCommunityOpen(false)}
          >
            <DropdownTrigger
              $isActive={pathWithoutLocale.startsWith('/about') || pathWithoutLocale.startsWith('/volunteer') || pathWithoutLocale.startsWith('/el-zoco')}
            >
              {locale === 'es' ? 'Comunidad' : locale === 'ar' ? 'المجتمع' : 'Community'}
              <span style={{ fontSize: '0.7rem' }}>▾</span>
            </DropdownTrigger>
            <DropdownMenu $isOpen={isCommunityOpen}>
              <DropdownItem href={`/${locale}/about/mission`}>
                {locale === 'es' ? 'Nosotros' : locale === 'ar' ? 'من نحن' : 'About Us'}
              </DropdownItem>
              <DropdownItem href={`/${locale}/volunteer`}>
                {locale === 'es' ? 'Voluntariado' : locale === 'ar' ? 'التطوع' : 'Volunteer'}
              </DropdownItem>
              <DropdownItem href={`/${locale}/el-zoco`}>
                {locale === 'es' ? 'El Zoco' : locale === 'ar' ? 'السوق' : 'The Souk'}
              </DropdownItem>
            </DropdownMenu>
          </DropdownContainer>
          <NavLink
            href={`/${locale}/experiencias`}
            $isActive={pathWithoutLocale.startsWith('/experiencias')}
          >
            {locale === 'es' ? 'Experiencias' : locale === 'ar' ? 'التجارب' : 'Experiences'}
          </NavLink>
          <NavLink
            href={`/${locale}/read`}
            $isActive={pathWithoutLocale.startsWith('/read')}
          >
            {locale === 'es' ? 'Blog' : locale === 'ar' ? 'المدونة' : 'Blog'}
          </NavLink>
          <NavLink
            href={`/${locale}/watch`}
            $isActive={pathWithoutLocale.startsWith('/watch')}
          >
            {t('watch')}
          </NavLink>
          <NavLink
            href={`/${locale}/listen`}
            $isActive={pathWithoutLocale.startsWith('/listen')}
          >
            {t('listen')}
          </NavLink>
          {/* LEARN TEMPORALMENTE OCULTO
          <NavLink
            href={`/${locale}/learn`}
            $isActive={pathWithoutLocale.startsWith('/learn')}
          >
            {t('learn')}
          </NavLink>
          */}
          <NavLink
            href={`/${locale}/contact`}
            $isActive={pathWithoutLocale.startsWith('/contact')}
          >
            {t('contact')}
          </NavLink>

          {/* Elementos adicionales solo para móvil */}
          <MobileMenuSection>
            <MobileMenuDivider />

            <NavLink
              href={`/${locale}/login`}
              style={{ fontSize: '0.875rem' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {locale === 'es' ? 'Iniciar Sesión' : locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </NavLink>

            <DonateButton href={`/${locale}/donate`} onClick={() => setIsMobileMenuOpen(false)}>
              {t('donate')}
            </DonateButton>

            <LocaleSwitcher>
              {locales.map((loc) => (
                <LocaleButton
                  key={loc}
                  href={getAlternateLocalePath(loc)}
                  $isActive={loc === locale}
                  hrefLang={loc}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {localeNames[loc]}
                </LocaleButton>
              ))}
            </LocaleSwitcher>
          </MobileMenuSection>
        </Nav>

        <DesktopActions>
          <NavLink href={`/${locale}/login`} style={{ fontSize: '0.875rem' }}>
            {locale === 'es' ? 'Iniciar Sesión' : locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
          </NavLink>

          <DonateButton href={`/${locale}/donate`}>
            {t('donate')}
          </DonateButton>

          <LocaleSwitcher>
            {locales.map((loc) => (
              <LocaleButton
                key={loc}
                href={getAlternateLocalePath(loc)}
                $isActive={loc === locale}
                hrefLang={loc}
              >
                {localeNames[loc]}
              </LocaleButton>
            ))}
          </LocaleSwitcher>
        </DesktopActions>
      </HeaderContent>
    </HeaderContainer>
  );
}

