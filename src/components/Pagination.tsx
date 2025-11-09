'use client';

import Link from 'next/link';
import styled from 'styled-components';

const PaginationContainer = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const PageButton = styled(Link)<{ $isActive?: boolean; $isDisabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  padding: 0 ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : 'transparent'};
  color: ${({ theme, $isActive }) => 
    $isActive ? 'white' : theme.colors.text.primary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme, $isActive }) => 
    $isActive ? theme.fontWeights.semibold : theme.fontWeights.medium};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: ${({ $isDisabled }) => $isDisabled ? 'not-allowed' : 'pointer'};
  opacity: ${({ $isDisabled }) => $isDisabled ? 0.5 : 1};
  pointer-events: ${({ $isDisabled }) => $isDisabled ? 'none' : 'auto'};
  
  &:hover:not(:disabled) {
    ${({ theme, $isActive, $isDisabled }) => !$isActive && !$isDisabled && `
      border-color: ${theme.colors.brand.primary};
      color: ${theme.colors.brand.primary};
      background: ${theme.colors.brand.primary}10;
    `}
  }
`;

const Ellipsis = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  height: 40px;
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | undefined>;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const buildUrl = (page: number) => {
    const params = new URLSearchParams();
    
    // Añadir searchParams existentes
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== 'page') {
        params.set(key, value);
      }
    });
    
    // Añadir el número de página
    if (page > 1) {
      params.set('page', page.toString());
    }
    
    const queryString = params.toString();
    return queryString ? `${basePath}?${queryString}` : basePath;
  };

  const generatePageNumbers = () => {
    const pages: (number | 'ellipsis')[] = [];
    const maxVisiblePages = 7;

    if (totalPages <= maxVisiblePages) {
      // Mostrar todas las páginas si son pocas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Siempre mostrar primera página
      pages.push(1);

      if (currentPage > 3) {
        pages.push('ellipsis');
      }

      // Páginas alrededor de la actual
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push('ellipsis');
      }

      // Siempre mostrar última página
      pages.push(totalPages);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  const pages = generatePageNumbers();

  return (
    <PaginationContainer aria-label="Paginación">
      <PageButton
        href={buildUrl(currentPage - 1)}
        $isDisabled={currentPage === 1}
        aria-label="Página anterior"
      >
        ← Anterior
      </PageButton>

      {pages.map((page, index) => {
        if (page === 'ellipsis') {
          return <Ellipsis key={`ellipsis-${index}`}>...</Ellipsis>;
        }

        return (
          <PageButton
            key={page}
            href={buildUrl(page)}
            $isActive={page === currentPage}
            aria-label={`Página ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </PageButton>
        );
      })}

      <PageButton
        href={buildUrl(currentPage + 1)}
        $isDisabled={currentPage === totalPages}
        aria-label="Página siguiente"
      >
        Siguiente →
      </PageButton>
    </PaginationContainer>
  );
}

