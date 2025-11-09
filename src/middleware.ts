import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

/**
 * Middleware para manejo de i18n
 * Redirige automáticamente según el locale del navegador
 */

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'always', // Siempre mostrar el locale en la URL
});

export const config = {
  // Match all pathnames except for
  // - /api (API routes)
  // - /_next (Next.js internals)
  // - /_vercel (Vercel internals)
  // - /favicon.ico, /sitemap.xml, /robots.txt (static files)
  matcher: ['/((?!api|_next|_vercel|favicon.ico|sitemap|robots|.*\\..*).*)'],
};

