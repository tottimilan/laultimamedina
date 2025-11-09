'use client';

import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

interface MainLayoutProps {
  children: React.ReactNode;
}

/**
 * Layout principal con Header y Footer
 * Se usa en todas las páginas principales
 */
export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <PageWrapper>
      <Header />
      <MainContent id="main-content">
        {children}
      </MainContent>
      <Footer />
    </PageWrapper>
  );
}

