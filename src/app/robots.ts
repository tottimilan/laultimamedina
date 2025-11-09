import { MetadataRoute } from 'next';

/**
 * Genera robots.txt dinámicamente
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    // En desarrollo/staging, bloquear todo
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}

