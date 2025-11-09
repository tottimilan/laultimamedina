import { MetadataRoute } from 'next';
import { locales } from '@/i18n';

/**
 * Genera sitemap dinámicamente con todas las rutas
 * Incluye rutas estáticas y dinámicas (cuando Strapi esté conectado)
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Rutas estáticas principales
  const staticRoutes = [
    { path: '', priority: 1, changeFrequency: 'daily' as const },
    { path: '/read', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/watch', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/listen', priority: 0.9, changeFrequency: 'daily' as const },
    { path: '/learn', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/experiencias', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/infographics', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/donate', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/sustain', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/search', priority: 0.5, changeFrequency: 'weekly' as const },
    { path: '/about/mission', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/el-zoco', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/privacy', priority: 0.6, changeFrequency: 'yearly' as const },
    { path: '/politica-general', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/politica-cookies', priority: 0.5, changeFrequency: 'yearly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/careers', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/volunteer', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/scholarship', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/learn/conversations', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/learn/curriculum', priority: 0.7, changeFrequency: 'monthly' as const },
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Generar entradas para cada locale
  locales.forEach((locale) => {
    staticRoutes.forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route.path}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${baseUrl}/${loc}${route.path}`])
          ),
        },
      });
    });
  });

  // TODO: Cuando Strapi esté configurado, añadir dinámicamente:
  // const articles = await getArticles({ locale: 'es', pageSize: 1000 });
  // articles.data.forEach(article => {
  //   sitemap.push({
  //     url: `${baseUrl}/es/read/${article.slug}`,
  //     lastModified: new Date(article.updatedAt || article.publishedAt),
  //     changeFrequency: 'monthly',
  //     priority: 0.8,
  //     alternates: { languages: ... },
  //   });
  // });

  return sitemap;
}


