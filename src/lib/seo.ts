/**
 * Utilidades para SEO: metadata, schema.org, hreflang
 */

import type { Metadata } from 'next';
import type { Locale } from '@/i18n';
import { locales } from '@/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SITE_NAME = 'La Última Medina';

interface GenerateMetadataProps {
  title: string;
  description: string;
  locale: Locale;
  path: string;
  keywords?: string[];
  ogImage?: string;
  noIndex?: boolean;
  type?: 'website' | 'article' | 'video.other' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
}

/**
 * Genera metadata completa para una página
 */
export function generatePageMetadata({
  title,
  description,
  locale,
  path,
  keywords = [],
  ogImage,
  noIndex = false,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors = [],
}: GenerateMetadataProps): Metadata {
  const canonicalUrl = `${SITE_URL}/${locale}${path}`;
  const imageUrl = ogImage || `${SITE_URL}/og-default.jpg`;

  // Generar URLs alternativas para hreflang
  const languages: Record<string, string> = {};
  locales.forEach((loc) => {
    languages[loc] = `${SITE_URL}/${loc}${path}`;
  });

  const metadata: Metadata = {
    title,
    description,
    keywords: keywords.join(', '),
    authors: authors.map((name) => ({ name })),
    robots: {
      index: !noIndex && process.env.NODE_ENV === 'production',
      follow: !noIndex && process.env.NODE_ENV === 'production',
    },
    alternates: {
      canonical: canonicalUrl,
      languages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      locale,
      type,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      site: '@laultimamedina',
      creator: '@laultimamedina',
    },
  };

  return metadata;
}

/**
 * Genera JSON-LD para Organization (global)
 */
export function generateOrganizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo.png`,
    description:
      locale === 'es'
        ? 'Educación islámica accesible, rigurosa y transformadora'
        : 'Accessible, rigorous, and transformative Islamic education',
    sameAs: [
      'https://twitter.com/laultimamedina',
      'https://facebook.com/laultimamedina',
      'https://instagram.com/laultimamedina',
      'https://youtube.com/@laultimamedina',
    ],
  };
}

/**
 * Genera JSON-LD para WebSite con SearchAction
 */
export function generateWebSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Genera JSON-LD para BreadcrumbList
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
  locale: Locale
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}/${locale}${item.url}`,
    })),
  };
}

/**
 * Genera JSON-LD para Article
 */
export function generateArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  modifiedAt,
  authors,
  image,
  locale,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  authors: Array<{ name: string }>;
  image?: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    url: `${SITE_URL}/${locale}/read/${slug}`,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: authors.map((author) => ({
      '@type': 'Person',
      name: author.name,
    })),
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
  };
}

/**
 * Genera JSON-LD para VideoObject
 */
export function generateVideoSchema({
  title,
  description,
  slug,
  uploadDate,
  thumbnailUrl,
  embedUrl,
  locale,
}: {
  title: string;
  description: string;
  slug: string;
  uploadDate: string;
  thumbnailUrl?: string;
  embedUrl: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    uploadDate,
    thumbnailUrl,
    embedUrl,
    url: `${SITE_URL}/${locale}/watch/${slug}`,
  };
}

/**
 * Genera JSON-LD para PodcastEpisode
 */
export function generatePodcastEpisodeSchema({
  title,
  description,
  slug,
  datePublished,
  audioUrl,
  locale,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  audioUrl: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: title,
    description,
    datePublished,
    url: `${SITE_URL}/${locale}/listen/${slug}`,
    associatedMedia: {
      '@type': 'MediaObject',
      contentUrl: audioUrl,
    },
  };
}

/**
 * Genera el string JSON-LD para usar en metadata o script tags
 * Para Next.js 14, usar en generateMetadata o en componentes Client
 */
export function getJsonLd(data: object): string {
  return JSON.stringify(data);
}

