/**
 * Generadores de Schema.org (JSON-LD) para SEO
 * Utilidades específicas para cada tipo de contenido
 */

import type { Locale } from '@/i18n';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const SITE_NAME = 'La Última Medina';

/**
 * Schema.org para Organization (usar en todas las páginas)
 */
export function getOrganizationSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logo.png`,
    description:
      locale === 'es'
        ? 'Educación islámica accesible, rigurosa y transformadora'
        : locale === 'ar'
        ? 'التعليم الإسلامي الميسر والدقيق والتحويلي'
        : 'Accessible, rigorous, and transformative Islamic education',
    sameAs: [
      'https://twitter.com/laultimamedina',
      'https://facebook.com/laultimamedina',
      'https://instagram.com/laultimamedina',
      'https://youtube.com/@laultimamedina',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: 'info@laultimamedina.org',
      contactType: 'customer service',
      availableLanguage: ['es', 'en', 'ar'],
    },
  };
}

/**
 * Schema.org para WebSite con SearchAction
 */
export function getWebSiteSchema(locale: Locale) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: `${SITE_URL}/${locale}`,
    inLanguage: locale,
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
 * Schema.org para BreadcrumbList
 */
export function getBreadcrumbSchema(
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
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}/${locale}${item.url}`,
    })),
  };
}

/**
 * Schema.org para Article/BlogPosting
 */
export function getArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  modifiedAt,
  authors,
  image,
  locale,
  type = 'Article',
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  modifiedAt?: string;
  authors: Array<{ name: string; url?: string }>;
  image?: string;
  locale: Locale;
  type?: 'Article' | 'BlogPosting' | 'ScholarlyArticle';
}) {
  return {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description,
    url: `${SITE_URL}/${locale}/read/${slug}`,
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    inLanguage: locale,
    author: authors.map((author) => ({
      '@type': 'Person',
      name: author.name,
      ...(author.url && { url: author.url }),
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
 * Schema.org para VideoObject
 */
export function getVideoSchema({
  title,
  description,
  slug,
  uploadDate,
  thumbnailUrl,
  embedUrl,
  duration,
  locale,
}: {
  title: string;
  description: string;
  slug: string;
  uploadDate: string;
  thumbnailUrl?: string;
  embedUrl: string;
  duration?: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    uploadDate,
    thumbnailUrl: thumbnailUrl || `${SITE_URL}/og-default.jpg`,
    embedUrl,
    contentUrl: embedUrl,
    ...(duration && { duration }),
    inLanguage: locale,
    url: `${SITE_URL}/${locale}/watch/${slug}`,
  };
}

/**
 * Schema.org para PodcastEpisode
 */
export function getPodcastEpisodeSchema({
  title,
  description,
  slug,
  datePublished,
  audioUrl,
  seriesName,
  locale,
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
  audioUrl: string;
  seriesName: string;
  locale: Locale;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: title,
    description,
    datePublished,
    inLanguage: locale,
    url: `${SITE_URL}/${locale}/listen/${slug}`,
    partOfSeries: {
      '@type': 'PodcastSeries',
      name: seriesName,
    },
    associatedMedia: {
      '@type': 'MediaObject',
      contentUrl: audioUrl,
    },
  };
}

/**
 * Genera el string JSON-LD para script tags
 * Usar en componentes Client con dangerouslySetInnerHTML
 */
export function generateJsonLd(data: object | object[]): string {
  return JSON.stringify(Array.isArray(data) ? data : data, null, 2);
}

