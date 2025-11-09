'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const Container = styled.article`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  display: flex;
  gap: ${({ theme }) => theme.spacing['2xl']};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
  }
`;

const SeriesCover = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: 300px;
  }
`;

const HeaderContent = styled.div`
  flex: 1;
`;

const SeriesName = styled(Link)`
  display: inline-block;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.primary};
  text-decoration: none;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const Synopsis = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md} 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  flex-wrap: wrap;
`;

const MediaContainer = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const VideoPlayer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 aspect ratio */
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.tertiary};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  box-shadow: ${({ theme }) => theme.shadows.md};
`;

const VideoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const AudioPlayer = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: ${({ theme }) => theme.shadows.sm};
`;

const AudioElement = styled.audio`
  width: 100%;
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

interface PodcastDetailProps {
  podcast: {
    id: string;
    title: string;
    slug: string;
    synopsis?: string;
    audioUrl?: string;
    videoUrl?: string; // NUEVO: URL del video del podcast
    embedUrl?: string;
    transcript?: string;
    date: string;
    series: {
      id: string;
      title: string;
      slug: string;
      cover?: {
        url: string;
      };
    };
    topics?: Array<{
      id: string;
      name: string;
      slug: string;
    }>;
  };
  locale: string;
}

export default function PodcastDetail({ podcast, locale }: PodcastDetailProps) {
  const t = useTranslations('listen');
  const tCommon = useTranslations('common');
  const [activeTab, setActiveTab] = useState<'about' | 'transcript'>('about');
  
  const publishDate = new Date(podcast.date).toLocaleDateString(
    locale === 'es' ? 'es-ES' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    const text = podcast.title;
    
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
            {podcast.series.cover && (
              <SeriesCover>
                <Image
                  src={podcast.series.cover.url}
                  alt={podcast.series.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </SeriesCover>
            )}
            
            <HeaderContent>
              <SeriesName href={`/${locale}/listen?series=${podcast.series.slug}`}>
                {podcast.series.title}
              </SeriesName>
              
              <Title>{podcast.title}</Title>
              
              {podcast.synopsis && <Synopsis>{podcast.synopsis}</Synopsis>}
              
              <Meta>
                <span>📅 {publishDate}</span>
                <span>🎧 {locale === 'es' ? 'Episodio' : 'Episode'}</span>
              </Meta>
            </HeaderContent>
          </Header>

          <MediaContainer>
            {podcast.videoUrl && (
              <VideoPlayer>
                <VideoIframe
                  src={podcast.videoUrl}
                  title={podcast.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </VideoPlayer>
            )}

            <AudioPlayer>
              <AudioElement controls>
                {podcast.audioUrl && (
                  <source src={podcast.audioUrl} type="audio/mpeg" />
                )}
                {locale === 'es' 
                  ? 'Tu navegador no soporta el reproductor de audio.' 
                  : locale === 'ar'
                  ? 'متصفحك لا يدعم مشغل الصوت.'
                  : 'Your browser does not support the audio element.'}
              </AudioElement>
            </AudioPlayer>
          </MediaContainer>

          {podcast.transcript && (
            <>
              <TabsContainer>
                <Tabs>
                  <Tab
                    $isActive={activeTab === 'about'}
                    onClick={() => setActiveTab('about')}
                  >
                    {locale === 'es' ? 'Acerca de' : 'About'}
                  </Tab>
                  <Tab
                    $isActive={activeTab === 'transcript'}
                    onClick={() => setActiveTab('transcript')}
                  >
                    {locale === 'es' ? 'Transcripción' : 'Transcript'}
                  </Tab>
                </Tabs>
              </TabsContainer>

              <TabContent>
                {activeTab === 'transcript' && (
                  <TranscriptContent>
                    <ReactMarkdown>{podcast.transcript}</ReactMarkdown>
                  </TranscriptContent>
                )}
                
                {activeTab === 'about' && (
                  <div>
                    <h2 style={{ marginBottom: '1rem' }}>
                      {locale === 'es' ? 'Sobre este episodio' : 'About this episode'}
                    </h2>
                    <p style={{ color: '#718096', lineHeight: '1.75' }}>
                      {podcast.synopsis}
                    </p>
                  </div>
                )}
              </TabContent>
            </>
          )}

          {podcast.topics && podcast.topics.length > 0 && (
            <Topics>
              {podcast.topics.map((topic) => (
                <TopicTag
                  key={topic.id}
                  href={`/${locale}/listen?topic=${topic.slug}`}
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

