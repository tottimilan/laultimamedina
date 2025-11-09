/**
 * Cliente de Strapi para consumir el CMS headless
 */

import type { Locale } from '@/i18n';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

interface StrapiRequestOptions {
  endpoint: string;
  query?: Record<string, any>;
  locale?: Locale;
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
}

/**
 * Cliente genérico para hacer peticiones a Strapi
 */
export async function fetchStrapi<T>({
  endpoint,
  query = {},
  locale,
  cache = 'force-cache',
  revalidate,
  tags = [],
}: StrapiRequestOptions): Promise<T> {
  const url = new URL(`${STRAPI_URL}/api${endpoint}`);

  // Añadir locale a la query si está especificado
  if (locale) {
    query.locale = locale;
  }

  // Añadir populate por defecto para relaciones
  if (!query.populate) {
    query.populate = '*';
  }

  // Construir query string
  Object.keys(query).forEach((key) => {
    const value = query[key];
    if (value !== undefined && value !== null) {
      if (typeof value === 'object') {
        url.searchParams.append(key, JSON.stringify(value));
      } else {
        url.searchParams.append(key, String(value));
      }
    }
  });

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const fetchOptions: RequestInit = {
    headers,
    cache,
    ...(revalidate && { next: { revalidate, tags } }),
  };

  try {
    const response = await fetch(url.toString(), fetchOptions);

    if (!response.ok) {
      throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    throw error;
  }
}

/**
 * Transforma los datos de Strapi al formato esperado por la app
 */
export function transformStrapiData<T>(data: any): T {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map((item) => transformStrapiData(item)) as T;
  }

  if (data.attributes) {
    const { id, attributes } = data;
    const transformed: any = { id, ...attributes };

    // Transformar relaciones recursivamente
    Object.keys(attributes).forEach((key) => {
      if (attributes[key]?.data) {
        transformed[key] = transformStrapiData(attributes[key].data);
      }
    });

    return transformed;
  }

  return data;
}

/**
 * Obtiene una URL completa de un asset de Strapi
 */
export function getStrapiMediaUrl(url?: string): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  return `${STRAPI_URL}${url}`;
}

// ============================================
// Funciones específicas por tipo de contenido
// ============================================

/**
 * Obtiene artículos con filtros opcionales
 */
export async function getArticles({
  locale,
  filters = {},
  sort = 'publishedAt:desc',
  page = 1,
  pageSize = 12,
}: {
  locale: Locale;
  filters?: Record<string, any>;
  sort?: string;
  page?: number;
  pageSize?: number;
}) {
  const response = await fetchStrapi<any>({
    endpoint: '/articles',
    locale,
    query: {
      filters,
      sort,
      pagination: { page, pageSize },
      populate: ['cover', 'topics', 'series', 'authors', 'authors.photo'],
    },
    revalidate: 60,
    tags: ['articles'],
  });

  return {
    data: transformStrapiData(response.data),
    meta: response.meta,
  };
}

/**
 * Obtiene un artículo por slug
 */
export async function getArticleBySlug(slug: string, locale: Locale) {
  const response = await fetchStrapi<any>({
    endpoint: '/articles',
    locale,
    query: {
      filters: { slug: { $eq: slug } },
      populate: ['cover', 'topics', 'series', 'authors', 'authors.photo', 'pdf', 'assets'],
    },
    revalidate: 3600,
    tags: [`article-${slug}`],
  });

  const articles = transformStrapiData(response.data);
  return Array.isArray(articles) && articles.length > 0 ? articles[0] : null;
}

/**
 * Obtiene vídeos
 */
export async function getVideos({
  locale,
  filters = {},
  sort = 'date:desc',
  page = 1,
  pageSize = 12,
}: {
  locale: Locale;
  filters?: Record<string, any>;
  sort?: string;
  page?: number;
  pageSize?: number;
}) {
  const response = await fetchStrapi<any>({
    endpoint: '/videos',
    locale,
    query: {
      filters,
      sort,
      pagination: { page, pageSize },
      populate: ['thumbnail', 'topics', 'series'],
    },
    revalidate: 60,
    tags: ['videos'],
  });

  return {
    data: transformStrapiData(response.data),
    meta: response.meta,
  };
}

/**
 * Obtiene un vídeo por slug
 */
export async function getVideoBySlug(slug: string, locale: Locale) {
  const response = await fetchStrapi<any>({
    endpoint: '/videos',
    locale,
    query: {
      filters: { slug: { $eq: slug } },
      populate: ['thumbnail', 'topics', 'series'],
    },
    revalidate: 3600,
    tags: [`video-${slug}`],
  });

  const videos = transformStrapiData(response.data);
  return Array.isArray(videos) && videos.length > 0 ? videos[0] : null;
}

/**
 * Obtiene episodios de podcast
 */
export async function getPodcastEpisodes({
  locale,
  filters = {},
  sort = 'date:desc',
  page = 1,
  pageSize = 12,
}: {
  locale: Locale;
  filters?: Record<string, any>;
  sort?: string;
  page?: number;
  pageSize?: number;
}) {
  const response = await fetchStrapi<any>({
    endpoint: '/podcast-episodes',
    locale,
    query: {
      filters,
      sort,
      pagination: { page, pageSize },
      populate: ['series', 'series.cover', 'topics'],
    },
    revalidate: 60,
    tags: ['podcast-episodes'],
  });

  return {
    data: transformStrapiData(response.data),
    meta: response.meta,
  };
}

/**
 * Obtiene topics para filtros
 */
export async function getTopics(locale: Locale) {
  const response = await fetchStrapi<any>({
    endpoint: '/topics',
    locale,
    query: {
      sort: 'name:asc',
      pagination: { pageSize: 100 },
    },
    revalidate: 3600,
    tags: ['topics'],
  });

  return transformStrapiData(response.data);
}

/**
 * Obtiene series para filtros
 */
export async function getSeries(locale: Locale, scope?: string) {
  const filters = scope ? { scope: { $eq: scope } } : {};

  const response = await fetchStrapi<any>({
    endpoint: '/series',
    locale,
    query: {
      filters,
      sort: 'order:asc',
      pagination: { pageSize: 100 },
      populate: ['cover'],
    },
    revalidate: 3600,
    tags: ['series'],
  });

  return transformStrapiData(response.data);
}

/**
 * Obtiene experiencias (rutas históricas)
 */
export async function getExperiences({
  locale,
  filters = {},
  sort = 'next_date:asc',
  page = 1,
  pageSize = 12,
}: {
  locale: Locale;
  filters?: Record<string, any>;
  sort?: string;
  page?: number;
  pageSize?: number;
}) {
  const response = await fetchStrapi<any>({
    endpoint: '/experiences',
    locale,
    query: {
      filters,
      sort,
      pagination: { page, pageSize },
      populate: ['cover_image', 'gallery', 'topics'],
    },
    revalidate: 60,
    tags: ['experiences'],
  });

  return {
    data: transformStrapiData(response.data),
    meta: response.meta,
  };
}

/**
 * Obtiene una experiencia por slug
 */
export async function getExperienceBySlug(slug: string, locale: Locale) {
  const response = await fetchStrapi<any>({
    endpoint: '/experiences',
    locale,
    query: {
      filters: { slug: { $eq: slug } },
      populate: ['cover_image', 'gallery', 'topics'],
    },
    revalidate: 3600,
    tags: [`experience-${slug}`],
  });

  const experiences = transformStrapiData(response.data);
  return Array.isArray(experiences) && experiences.length > 0 ? experiences[0] : null;
}

/**
 * Obtiene módulos Learn
 */
export async function getLearnModules({
  locale,
  filters = {},
  sort = 'createdAt:desc',
  page = 1,
  pageSize = 12,
}: {
  locale: Locale;
  filters?: Record<string, any>;
  sort?: string;
  page?: number;
  pageSize?: number;
}) {
  const response = await fetchStrapi<any>({
    endpoint: '/learn-modules',
    locale,
    query: {
      filters,
      sort,
      pagination: { page, pageSize },
      populate: ['cover', 'resources', 'topics'],
    },
    revalidate: 60,
    tags: ['learn-modules'],
  });

  return {
    data: transformStrapiData(response.data),
    meta: response.meta,
  };
}

/**
 * Obtiene un módulo Learn por slug
 */
export async function getLearnModuleBySlug(slug: string, locale: Locale) {
  const response = await fetchStrapi<any>({
    endpoint: '/learn-modules',
    locale,
    query: {
      filters: { slug: { $eq: slug } },
      populate: ['cover', 'resources', 'topics'],
    },
    revalidate: 3600,
    tags: [`learn-module-${slug}`],
  });

  const modules = transformStrapiData(response.data);
  return Array.isArray(modules) && modules.length > 0 ? modules[0] : null;
}

