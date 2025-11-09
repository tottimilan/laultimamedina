/**
 * Tipos TypeScript compartidos para La Última Medina
 */

import { Locale } from '@/i18n';

// ============================================
// Tipos de Contenido del CMS (Strapi)
// ============================================

export interface SEOMeta {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: MediaAsset;
  noIndex?: boolean;
  canonical?: string;
}

export interface MediaAsset {
  id: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: { url: string };
    small?: { url: string };
    medium?: { url: string };
    large?: { url: string };
  };
}

export interface Topic {
  id: string;
  name: string;
  slug: string;
  description?: string;
  parent?: Topic;
  color?: string;
  icon?: string;
}

export interface Series {
  id: string;
  title: string;
  slug: string;
  description?: string;
  cover?: MediaAsset;
  order?: number;
  scope: 'read' | 'watch' | 'listen' | 'learn';
}

export interface Person {
  id: string;
  name: string;
  role?: string;
  photo?: MediaAsset;
  shortBio?: string;
  longBio?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
  isAuthor?: boolean;
  isTeam?: boolean;
  isBoard?: boolean;
}

export type ArticleType =
  | 'paper'
  | 'ebook'
  | 'blog'
  | 'report'
  | 'translation'
  | 'printable';

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  body: string; // Rich text / Markdown
  cover?: MediaAsset;
  type: ArticleType;
  topics: Topic[];
  series?: Series;
  authors: Person[];
  readingTime?: number;
  pdf?: MediaAsset;
  assets?: MediaAsset[];
  publishedAt: string;
  updatedAt?: string;
  seo: SEOMeta;
  locale: Locale;
}

export type VideoProvider = 'youtube' | 'vimeo' | 'other';

export interface Video {
  id: string;
  title: string;
  slug: string;
  synopsis?: string;
  provider: VideoProvider;
  videoId?: string; // YouTube/Vimeo ID
  embedUrl?: string;
  transcript?: string;
  date: string;
  thumbnail?: MediaAsset;
  topics: Topic[];
  series?: Series;
  seo: SEOMeta;
  locale: Locale;
}

export interface PodcastSeries {
  id: string;
  title: string;
  slug: string;
  description?: string;
  cover?: MediaAsset;
  rssUrl?: string;
}

export interface PodcastEpisode {
  id: string;
  series: PodcastSeries;
  title: string;
  slug: string;
  synopsis?: string;
  audioUrl?: string;
  embedUrl?: string;
  transcript?: string;
  date: string;
  topics: Topic[];
  seo: SEOMeta;
  locale: Locale;
}

export type LearnModuleKind =
  | 'conversations'
  | 'conviction_circles'
  | 'curriculum_unit'
  | 'curriculum_lesson'
  | 'talk_toolkit'
  | 'wisay_qa';

export interface LearnModule {
  id: string;
  kind: LearnModuleKind;
  title: string;
  slug: string;
  summary?: string;
  goals?: string[];
  resources?: MediaAsset[];
  audience?: string;
  steps?: string;
  faq?: Array<{ question: string; answer: string }>;
  topics: Topic[];
  series?: Series;
  
  // Para curriculum_unit
  grade?: string;
  duration?: string;
  unitNumber?: number;
  lessons?: LearnModule[];
  
  // Para curriculum_lesson
  lessonNumber?: number;
  materials?: string;
  assessment?: string;
  standards?: string;
  
  // Para wisay_qa
  question?: string;
  answer?: string;
  related?: LearnModule[];
  
  seo: SEOMeta;
  locale: Locale;
}

export interface Job {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'volunteer';
  description: string;
  requirements?: string;
  applyUrl?: string;
  status: 'open' | 'closed';
  seo: SEOMeta;
  locale: Locale;
}

export interface Document {
  id: string;
  title: string;
  slug: string;
  year?: number;
  file?: MediaAsset;
  externalUrl?: string;
  seo: SEOMeta;
  locale: Locale;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  blocks: any[]; // Dynamic zones de Strapi
  seo: SEOMeta;
  locale: Locale;
}

export interface Redirect {
  id: string;
  from: string;
  to: string;
  status: 301 | 302;
  localeScope?: Locale;
}

export interface MenuItem {
  label: string;
  url?: string;
  relation?: any;
  localeScope?: Locale;
}

export interface Menu {
  id: string;
  location: 'header' | 'footer' | 'learn';
  items: MenuItem[];
}

// ============================================
// Tipos de UI/UX
// ============================================

export interface FilterState {
  type?: string[];
  topic?: string[];
  series?: string[];
  sort?: 'latest' | 'oldest' | 'popular';
  page?: number;
}

export interface PaginationData {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface HubData<T> {
  items: T[];
  pagination: PaginationData;
  filters: FilterState;
}

// ============================================
// Tipos de Donaciones (Stripe)
// ============================================

export type DonationType = 'one-time' | 'monthly';

export interface DonationAmount {
  value: number;
  label: string;
  isCustom?: boolean;
}

export interface Donor {
  id: string;
  email: string;
  name?: string;
  stripeCustomerId: string;
  isSustainer: boolean;
  totalDonated: number;
  lastDonationDate: string;
}

// ============================================
// Tipos de Metadata (SEO)
// ============================================

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
  alternates?: {
    languages: Record<Locale, string>;
  };
}

