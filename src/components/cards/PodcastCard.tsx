'use client';

import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
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

const Cover = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  
  &::after {
    content: '🎧';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
`;

const SeriesName = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.brand.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const Title = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  line-height: ${({ theme }) => theme.lineHeights.tight};
`;

const Synopsis = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

interface PodcastCardProps {
  podcast: {
    id: string;
    title: string;
    slug: string;
    synopsis?: string;
    audioUrl?: string;
    date: string;
    series: {
      title: string;
      cover?: { url: string };
    };
    topics?: Array<{ name: string; slug: string }>;
  };
  locale: string;
}

export default function PodcastCard({ podcast, locale }: PodcastCardProps) {
  return (
    <Link href={`/${locale}/listen/${podcast.slug}`} style={{ textDecoration: 'none' }}>
      <Card whileHover={{ scale: 1.02 }}>
        <Cover>
          {podcast.series.cover && (
            <Image
              src={podcast.series.cover.url}
              alt={podcast.series.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </Cover>
        <Content>
          <SeriesName>{podcast.series.title}</SeriesName>
          <Title>{podcast.title}</Title>
          {podcast.synopsis && <Synopsis>{podcast.synopsis}</Synopsis>}
        </Content>
      </Card>
    </Link>
  );
}

