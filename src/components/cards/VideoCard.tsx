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

const Thumbnail = styled.div`
  position: relative;
  width: 100%;
  height: 220px;
  background: ${({ theme }) => theme.colors.background.tertiary};
  
  &::after {
    content: '▶';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: white;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }
`;

const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.xl};
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

interface VideoCardProps {
  video: {
    id: string;
    title: string;
    slug: string;
    synopsis?: string;
    provider: string;
    videoId?: string;
    thumbnail?: { url: string };
    date: string;
    topics?: Array<{ name: string; slug: string }>;
  };
  locale: string;
}

export default function VideoCard({ video, locale }: VideoCardProps) {
  return (
    <Link href={`/${locale}/watch/${video.slug}`} style={{ textDecoration: 'none' }}>
      <Card whileHover={{ scale: 1.02 }}>
        <Thumbnail>
          {video.thumbnail && (
            <Image
              src={video.thumbnail.url}
              alt={video.title}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
        </Thumbnail>
        <Content>
          <Title>{video.title}</Title>
          {video.synopsis && <Synopsis>{video.synopsis}</Synopsis>}
        </Content>
      </Card>
    </Link>
  );
}

