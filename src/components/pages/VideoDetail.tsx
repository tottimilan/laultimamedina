'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Container = styled.article`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const Synopsis = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-wrap: wrap;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const TabsContainer = styled.div`
  border-bottom: 2px solid ${({ theme }) => theme.colors.border.light};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Tabs = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.md};
`;

const Tab = styled.button<{ $isActive: boolean }>`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  border: none;
  background: transparent;
  color: ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  cursor: pointer;
  border-bottom: 3px solid ${({ theme, $isActive }) => 
    $isActive ? theme.colors.brand.primary : 'transparent'};
  transition: all ${({ theme }) => theme.transitions.base};
  position: relative;
  top: 2px;
  
  &:hover {
    color: ${({ theme }) => theme.colors.brand.primary};
  }
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing.xl} 0;
`;

const TranscriptContent = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  
  h1, h2, h3 {
    color: ${({ theme }) => theme.colors.brand.dark};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin-top: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  ul, ol {
    margin-left: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const Topics = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  flex-wrap: wrap;
  margin: ${({ theme }) => theme.spacing['2xl']} 0;
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

interface VideoDetailProps {
  video: {
    id: string;
    title: string;
    slug: string;
    synopsis?: string;
    provider: 'youtube' | 'vimeo' | 'other';
    videoId?: string;
    embedUrl?: string;
    transcript?: string;
    date: string;
    thumbnail?: {
      url: string;
      alternativeText?: string;
    };
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
  };
  locale: string;
}

export default function VideoDetail({ video, locale }: VideoDetailProps) {
  const t = useTranslations('watch');
  const tCommon = useTranslations('common');
  const [activeTab, setActiveTab] = useState<'video' | 'transcript'>('video');
  
  const publishDate = new Date(video.date).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = video.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
        break;
    }
  };

  return (
    <MainLayout>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header>
            <Title>{video.title}</Title>
            {video.synopsis && <Synopsis>{video.synopsis}</Synopsis>}
            
            <Meta>
              <span>📅 {publishDate}</span>
              {video.series && (
                <Link 
                  href={`/${locale}/watch?series=${video.series.slug}`}
                  style={{ color: 'inherit', textDecoration: 'none' }}
                >
                  📚 {video.series.title}
                </Link>
              )}
            </Meta>
          </Header>

          <VideoContainer>
            <VideoIframe
              src={video.embedUrl || `https://www.youtube.com/embed/${video.videoId}`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </VideoContainer>

          {video.transcript && (
            <>
              <TabsContainer>
                <Tabs>
                  <Tab
                    $isActive={activeTab === 'video'}
                    onClick={() => setActiveTab('video')}
                  >
                    {locale === 'es' ? 'Acerca de' : 'About'}
                  </Tab>
                  <Tab
                    $isActive={activeTab === 'transcript'}
                    onClick={() => setActiveTab('transcript')}
                  >
                    {t('transcript')}
                  </Tab>
                </Tabs>
              </TabsContainer>

              <TabContent>
                {activeTab === 'transcript' && (
                  <TranscriptContent>
                    <ReactMarkdown>{video.transcript}</ReactMarkdown>
                  </TranscriptContent>
                )}
                
                {activeTab === 'video' && (
                  <div>
                    <h2 style={{ marginBottom: '1rem' }}>
                      {locale === 'es' ? 'Sobre este video' : 'About this video'}
                    </h2>
                    <p style={{ color: '#718096', lineHeight: '1.75' }}>
                      {video.synopsis}
                    </p>
                  </div>
                )}
              </TabContent>
            </>
          )}

          {video.topics && video.topics.length > 0 && (
            <Topics>
              {video.topics.map((topic) => (
                <TopicTag
                  key={topic.id}
                  href={`/${locale}/watch?topic=${topic.slug}`}
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
              <ShareButton onClick={() => handleShare('whatsapp')}>
                WhatsApp
              </ShareButton>
            </ShareButtons>
          </ShareSection>
        </motion.div>
      </Container>
    </MainLayout>
  );
}

