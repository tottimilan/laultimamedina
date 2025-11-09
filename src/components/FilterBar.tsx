'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';

const FilterContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  background: white;
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primary}20;
  }
`;

const ClearButton = styled.button`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  align-self: flex-end;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    color: ${({ theme }) => theme.colors.brand.primary};
    background: ${({ theme }) => theme.colors.brand.primary}10;
  }
`;

interface FilterOption {
  value: string;
  label: string;
}

interface FilterBarProps {
  filterOptions: {
    types?: FilterOption[];
    topics?: FilterOption[];
    series?: FilterOption[];
    sortOptions: FilterOption[];
  };
  currentFilters: {
    type?: string;
    topic?: string;
    series?: string;
    sort: string;
  };
  basePath: string;
}

export default function FilterBar({ filterOptions, currentFilters, basePath }: FilterBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations('filters');

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (value && value !== 'all') {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Reset page to 1 when filters change
    params.set('page', '1');
    
    router.push(`${basePath}?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push(basePath);
  };

  const hasActiveFilters = 
    currentFilters.type || 
    currentFilters.topic || 
    currentFilters.series ||
    (currentFilters.sort && currentFilters.sort !== 'latest');

  return (
    <FilterContainer>
      {filterOptions.types && (
        <FilterGroup>
          <FilterLabel htmlFor="filter-type">{t('type')}</FilterLabel>
          <Select
            id="filter-type"
            value={currentFilters.type || 'all'}
            onChange={(e) => updateFilter('type', e.target.value)}
          >
            {filterOptions.types.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterGroup>
      )}

      {filterOptions.topics && (
        <FilterGroup>
          <FilterLabel htmlFor="filter-topic">{t('topic')}</FilterLabel>
          <Select
            id="filter-topic"
            value={currentFilters.topic || 'all'}
            onChange={(e) => updateFilter('topic', e.target.value)}
          >
            <option value="all">{t('topic')}</option>
            {filterOptions.topics.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterGroup>
      )}

      {filterOptions.series && (
        <FilterGroup>
          <FilterLabel htmlFor="filter-series">{t('series')}</FilterLabel>
          <Select
            id="filter-series"
            value={currentFilters.series || 'all'}
            onChange={(e) => updateFilter('series', e.target.value)}
          >
            <option value="all">{t('series')}</option>
            {filterOptions.series.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </FilterGroup>
      )}

      <FilterGroup>
        <FilterLabel htmlFor="filter-sort">{t('sort')}</FilterLabel>
        <Select
          id="filter-sort"
          value={currentFilters.sort}
          onChange={(e) => updateFilter('sort', e.target.value)}
        >
          {filterOptions.sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FilterGroup>

      {hasActiveFilters && (
        <ClearButton onClick={clearFilters}>
          {t('clear')}
        </ClearButton>
      )}
    </FilterContainer>
  );
}

