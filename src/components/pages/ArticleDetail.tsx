'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const Container = styled.article`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const TypeBadge = styled.span`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.primary};
  background: ${({ theme }) => theme.colors.brand.primary}15;
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const Excerpt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  flex-wrap: wrap;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const AuthorPhoto = styled.div`
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: ${({ theme }) => theme.radii.full};
  overflow: hidden;
  flex-shrink: 0;
`;

const AuthorDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const AuthorRole = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const MetaItem = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const CoverImage = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 300px;
  }
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  
  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.colors.brand.dark};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-top: ${({ theme }) => theme.spacing['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  h1 { font-size: ${({ theme }) => theme.fontSizes['3xl']}; }
  h2 { font-size: ${({ theme }) => theme.fontSizes['2xl']}; }
  h3 { font-size: ${({ theme }) => theme.fontSizes.xl}; }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  ul, ol {
    margin-left: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
  
  strong {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.brand.dark};
  }
  
  a {
    color: ${({ theme }) => theme.colors.brand.primary};
    text-decoration: underline;
    
    &:hover {
      color: ${({ theme }) => theme.colors.brand.secondary};
    }
  }
  
  blockquote {
    border-left: 4px solid ${({ theme }) => theme.colors.brand.primary};
    padding-left: ${({ theme }) => theme.spacing.xl};
    margin: ${({ theme }) => theme.spacing['2xl']} 0;
    font-style: italic;
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const Topics = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin: ${({ theme }) => theme.spacing['3xl']} 0;
`;

const TopicTag = styled(Link)`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.brand.primary};
  background: ${({ theme }) => theme.colors.brand.primary}15;
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.radii.full};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.primary};
    color: white;
  }
`;

const ShareSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing['3xl']};
  padding: ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: center;
`;

const ShareTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ShareButtons = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
  justify-content: center;
  flex-wrap: wrap;
`;

const ShareButton = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.secondary};
    transform: translateY(-2px);
  }
`;

interface ArticleDetailProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    body: string;
    type: string;
    readingTime?: number;
    publishedAt: string;
    updatedAt?: string;
    cover?: {
      id: string;
      url: string;
      alternativeText?: string;
      width?: number;
      height?: number;
    };
    authors: Array<{
      id: string;
      name: string;
      role?: string;
      photo?: {
        id: string;
        url: string;
      };
      shortBio?: string;
    }>;
    topics?: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
    series?: {
      id: string;
      title: string;
      slug: string;
    };
    seo: {
      title?: string;
      description?: string;
    };
    locale: string;
  };
  locale: string;
}

export default function ArticleDetail({ article, locale }: ArticleDetailProps) {
  const t = useTranslations('read');
  const tCommon = useTranslations('common');
  
  const publishDate = new Date(article.publishedAt).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = article.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
    }
  };

  return (
    <MainLayout>
      <Container>
        <Header>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <TypeBadge>{t(`types.${article.type}`)}</TypeBadge>
            <Title>{article.title}</Title>
            {article.excerpt && <Excerpt>{article.excerpt}</Excerpt>}
            
            <Meta>
              <AuthorInfo>
                {article.authors[0].photo && (
                  <AuthorPhoto>
                    <Image
                      src={article.authors[0].photo.url}
                      alt={article.authors[0].name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </AuthorPhoto>
                )}
                <AuthorDetails>
                  <AuthorName>{article.authors[0].name}</AuthorName>
                  {article.authors[0].role && (
                    <AuthorRole>{article.authors[0].role}</AuthorRole>
                  )}
                </AuthorDetails>
              </AuthorInfo>
              
              <MetaItem>📅 {publishDate}</MetaItem>
              
              {article.readingTime && (
                <MetaItem>
                  ⏱️ {t('readingTime', { minutes: article.readingTime })}
                </MetaItem>
              )}
            </Meta>
          </motion.div>
        </Header>

        {article.cover && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <CoverImage>
              <Image
                src={article.cover.url}
                alt={article.cover.alternativeText || article.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </CoverImage>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Content>
            <ReactMarkdown>{article.body}</ReactMarkdown>
          </Content>
        </motion.div>

        {article.topics && article.topics.length > 0 && (
          <Topics>
            {article.topics.map((topic) => (
              <TopicTag
                key={topic.id}
                href={`/${locale}/read?topic=${topic.slug}`}
              >
                {topic.name}
              </TopicTag>
            ))}
          </Topics>
        )}

        <ShareSection>
          <ShareTitle>{tCommon('share')}</ShareTitle>
          <ShareButtons>
            <ShareButton onClick={() => handleShare('twitter')}>
              Twitter
            </ShareButton>
            <ShareButton onClick={() => handleShare('facebook')}>
              Facebook
            </ShareButton>
            <ShareButton onClick={() => handleShare('linkedin')}>
              LinkedIn
            </ShareButton>
            <ShareButton onClick={() => handleShare('whatsapp')}>
              WhatsApp
            </ShareButton>
          </ShareButtons>
        </ShareSection>
      </Container>
    </MainLayout>
  );
}

