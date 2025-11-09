'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import styled from 'styled-components';

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

const SearchWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const AskButton = styled.button`
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: #3D52EE;
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  z-index: 1;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding: ${({ theme }) => theme.spacing.xs};
    
    span {
      display: none;
    }
    
    svg {
      margin: 0;
    }
  }
  
  &:hover {
    background: #2a3ccc;
  }
  
  svg {
    width: 14px;
    height: 14px;
    color: white;
  }
  
  span {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: white;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  padding-left: 140px;
  padding-right: 3rem;
  font-size: ${({ theme }) => theme.fontSizes.base};
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: ${({ theme }) => theme.radii.md};
  background: rgba(255, 255, 255, 0.98);
  color: ${({ theme }) => theme.colors.text.primary};
  transition: all ${({ theme }) => theme.transitions.base};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  height: 45px;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    padding-left: 110px;
    padding-right: 2rem;
    font-size: ${({ theme }) => theme.fontSizes.sm};
    height: 42px;
  }
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
  }
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.secondary};
    background: white;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.spacing.md};
  top: 50%;
  transform: translateY(-50%);
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.muted};
  pointer-events: none;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

const SuggestionsContainer = styled.div`
  position: absolute;
  top: calc(100% + ${({ theme }) => theme.spacing.sm});
  left: 0;
  right: 0;
  background: white;
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  max-height: 500px;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.zIndices.dropdown};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const SectionHeader = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.brand.accent};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const TrendingTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const TrendingTag = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.sm};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
  
  svg {
    width: 14px;
    height: 14px;
    opacity: 0.5;
  }
`;

const CommonQuestions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Question = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.sm} 0;
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.primary};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding-left: ${({ theme }) => theme.spacing.sm};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }
`;

const SuggestionItem = styled.button`
  width: 100%;
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  text-align: left;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transitions.fast};
  border-radius: ${({ theme }) => theme.radii.sm};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const SuggestionImage = styled.div`
  position: relative;
  width: 80px;
  height: 60px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.sm};
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.tertiary};
`;

const SuggestionContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const SuggestionType = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.brand.accent};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: block;
`;

const SuggestionTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

interface SearchBarProps {
  placeholder?: string;
  autoFocus?: boolean;
}

export default function SearchBar({ placeholder, autoFocus = false }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const locale = useLocale();

  const trendingSearches = [
    locale === 'es' ? 'Ramadán' : locale === 'ar' ? 'رمضان' : 'Ramadan',
    locale === 'es' ? 'Oración' : locale === 'ar' ? 'الصلاة' : 'Prayer',
    locale === 'es' ? 'Hajj' : locale === 'ar' ? 'الحج' : 'Hajj',
    locale === 'es' ? 'Corán' : locale === 'ar' ? 'القرآن' : 'Quran',
  ];

  const commonQuestions = locale === 'es' ? [
    '¿Cuál es el significado de ayunar en Ashura?',
    '¿Está permitida la meditación en el Islam?',
    '¿Quién fue Khalid bin Walid?',
    '¿Qué significa Al-Latif?',
    '¿Por qué Allah quiere que lo adoremos?',
  ] : locale === 'ar' ? [
    'ما معنى صيام عاشوراء؟',
    'هل التأمل مسموح في الإسلام؟',
    'من كان خالد بن الوليد؟',
    'ما معنى اسم الله اللطيف؟',
    'لماذا يريد الله أن نعبده؟',
  ] : [
    'What is the significance of fasting on Ashura?',
    'Is meditation allowed in Islam?',
    'Who was Khalid bin Walid?',
    'What does Al-Latif mean?',
    'Why does Allah want us to worship Him?',
  ];

  // Datos de sugerencias con imágenes
  const allContent = [
    { 
      type: locale === 'es' ? 'paper' : locale === 'ar' ? 'ورقة بحثية' : 'paper',
      title: locale === 'es' ? 'La importancia de la oración en el Islam' : locale === 'ar' ? 'أهمية الصلاة في الإسلام' : 'The Importance of Prayer in Islam',
      slug: 'importancia-oracion-islam',
      image: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa',
    },
    { 
      type: locale === 'es' ? 'video' : locale === 'ar' ? 'فيديو' : 'video',
      title: locale === 'es' ? 'Los Fundamentos de la Fe Islámica' : locale === 'ar' ? 'أسس الإيمان الإسلامي' : 'Fundamentals of Islamic Faith',
      slug: 'fundamentos-fe-islamica',
      image: 'https://images.unsplash.com/photo-1542816417-0983c9c9ad53',
    },
    { 
      type: locale === 'es' ? 'podcast' : locale === 'ar' ? 'بودكاست' : 'podcast',
      title: locale === 'es' ? 'Reflexiones sobre el Ramadán' : locale === 'ar' ? 'تأملات في رمضان' : 'Reflections on Ramadan',
      slug: 'reflexiones-ramadan-ep1',
      image: 'https://images.unsplash.com/photo-1478737270239-2f02b77fc618',
    },
  ];

  // Simulación de búsqueda
  useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }

    const filtered = allContent.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    setSuggestions(filtered);
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/${locale}/search?q=${encodeURIComponent(query)}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    const basePath = suggestion.type === 'article' ? 'read' 
      : suggestion.type === 'video' ? 'watch' 
      : 'listen';
    
    router.push(`/${locale}/${basePath}/${suggestion.slug}`);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    setShowSuggestions(false);
  };

  const handleQuestionClick = (question: string) => {
    router.push(`/${locale}/search?q=${encodeURIComponent(question)}`);
    setShowSuggestions(false);
  };

  return (
    <SearchContainer>
      <form onSubmit={handleSearch}>
        <SearchWrapper>
          <AskButton 
            type="button" 
            onClick={(e) => {
              e.preventDefault();
              const input = document.querySelector('input[type="search"]') as HTMLInputElement;
              if (input) input.focus();
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
              <path fill="currentColor" d="M391.5 53.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L448 96 469.2 152.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L512 96 568.5 74.8c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L512 32 490.8-24.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L448 32 391.5 53.2zm-185 20.1c-2.6-5.7-8.3-9.3-14.5-9.3s-11.9 3.6-14.5 9.3l-53.1 115-115 53.1C3.6 244.1 0 249.8 0 256s3.6 11.9 9.3 14.5l115 53.1 53.1 115c2.6 5.7 8.3 9.3 14.5 9.3s11.9-3.6 14.5-9.3l53.1-115 115-53.1c5.7-2.6 9.3-8.3 9.3-14.5s-3.6-11.9-9.3-14.5l-115-53.1-53.1-115zM416 416l-56.5 21.2c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 480 437.2 536.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 480 536.5 458.8c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 416 458.8 359.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 416z"/>
            </svg>
            <span>{locale === 'es' ? 'Pregunta LUM' : locale === 'ar' ? 'اسأل LAM' : 'Ask LAM'}</span>
          </AskButton>
          
          <SearchInput
            type="search"
            placeholder={placeholder || (locale === 'es' ? 'Buscar artículos, vídeos, podcasts...' : locale === 'ar' ? 'ابحث عن المقالات والفيديوهات...' : 'Search articles, videos, podcasts...')}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 300)}
            autoFocus={autoFocus}
          />
          
          <SearchIcon>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M368 208a160 160 0 1 0 -320 0 160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"/>
            </svg>
          </SearchIcon>
        </SearchWrapper>
      </form>

      {showSuggestions && (
        <SuggestionsContainer>
          {query.length < 2 ? (
            <>
              <SectionHeader>
                {locale === 'es' ? 'Trending' : locale === 'ar' ? 'الشائع' : 'Trending'}
              </SectionHeader>
              <TrendingTags>
                {trendingSearches.map((term, index) => (
                  <TrendingTag key={index} onClick={() => handleTrendingClick(term)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                      <path fill="currentColor" d="M368 208a160 160 0 1 0 -320 0 160 160 0 1 0 320 0zM337.1 371.1C301.7 399.2 256.8 416 208 416 93.1 416 0 322.9 0 208S93.1 0 208 0 416 93.1 416 208c0 48.8-16.8 93.7-44.9 129.1L505 471c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0L337.1 371.1z"/>
                    </svg>
                    <span>{term}</span>
                  </TrendingTag>
                ))}
              </TrendingTags>

              <SectionHeader style={{ marginTop: '1rem' }}>
                {locale === 'es' ? 'Preguntas Comunes' : locale === 'ar' ? 'أسئلة شائعة' : 'Common Questions'}
              </SectionHeader>
              <CommonQuestions>
                {commonQuestions.map((question, index) => (
                  <Question key={index} onClick={() => handleQuestionClick(question)}>
                    {question}
                  </Question>
                ))}
              </CommonQuestions>
            </>
          ) : suggestions.length > 0 ? (
            <>
              {suggestions.map((suggestion, index) => (
                <SuggestionItem
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <SuggestionImage>
                    <img
                      src={suggestion.image}
                      alt={suggestion.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </SuggestionImage>
                  <SuggestionContent>
                    <SuggestionType>{suggestion.type}</SuggestionType>
                    <SuggestionTitle>{suggestion.title}</SuggestionTitle>
                  </SuggestionContent>
                </SuggestionItem>
              ))}
            </>
          ) : null}
        </SuggestionsContainer>
      )}
    </SearchContainer>
  );
}

