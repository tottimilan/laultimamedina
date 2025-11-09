'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const Card = styled(motion.article)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.base};
  cursor: pointer;
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-4px);
  }
`;

const CoverImage = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  overflow: hidden;
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
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
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Excerpt = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const Author = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`;

const ReadingTime = styled.span`
  &::before {
    content: '•';
    margin-right: ${({ theme }) => theme.spacing.sm};
  }
`;

const Topics = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.xs};
  flex-wrap: wrap;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const TopicTag = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  background: ${({ theme }) => theme.colors.background.tertiary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.radii.sm};
`;

interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt?: string;
    type: string;
    readingTime?: number;
    publishedAt: string;
    cover?: {
      url: string;
      alternativeText?: string;
    };
    authors: Array<{
      name: string;
      photo?: { url: string };
    }>;
    topics?: Array<{
      name: string;
      slug: string;
    }>;
  };
  locale: string;
}

export default function ArticleCard({ article, locale }: ArticleCardProps) {
  const t = useTranslations('read');

  return (
    <Link href={`/${locale}/read/${article.slug}`} style={{ textDecoration: 'none' }}>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ scale: 1.02 }}
      >
        {article.cover && (
          <CoverImage>
            <Image
              src={article.cover.url}
              alt={article.cover.alternativeText || article.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </CoverImage>
        )}
        
        <Content>
          <TypeBadge>{t(`types.${article.type}`)}</TypeBadge>
          
          <Title>{article.title}</Title>
          
          {article.excerpt && <Excerpt>{article.excerpt}</Excerpt>}
          
          {article.topics && article.topics.length > 0 && (
            <Topics>
              {article.topics.map((topic) => (
                <TopicTag key={topic.slug}>{topic.name}</TopicTag>
              ))}
            </Topics>
          )}
          
          <Meta>
            <Author>{article.authors[0]?.name}</Author>
            {article.readingTime && (
              <ReadingTime>
                {t('readingTime', { minutes: article.readingTime })}
              </ReadingTime>
            )}
          </Meta>
        </Content>
      </Card>
    </Link>
  );
}

