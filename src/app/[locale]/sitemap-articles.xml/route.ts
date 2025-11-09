import { NextRequest, NextResponse } from 'next/server';

/**
 * Sitemap específico para artículos
 * TODO: Conectar con Strapi cuando esté configurado
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { locale: string } }
) {
  const { locale } = params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // TODO: Obtener artículos reales de Strapi
  // const { data: articles } = await getArticles({ locale, pageSize: 1000 });

  const mockArticles = [
    { slug: 'importancia-oracion-islam', updatedAt: new Date().toISOString() },
    { slug: 'coran-guia-de-vida', updatedAt: new Date().toISOString() },
    { slug: 'historia-islam-al-andalus', updatedAt: new Date().toISOString() },
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${mockArticles.map(article => `
  <url>
    <loc>${baseUrl}/${locale}/read/${article.slug}</loc>
    <lastmod>${article.updatedAt}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    <xhtml:link rel="alternate" hreflang="es" href="${baseUrl}/es/read/${article.slug}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/read/${article.slug}"/>
    <xhtml:link rel="alternate" hreflang="ar" href="${baseUrl}/ar/read/${article.slug}"/>
  </url>
  `).join('')}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}

