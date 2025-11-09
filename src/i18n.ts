import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

/**
 * Configuración de i18n con next-intl
 * Soporta ES (default) y EN
 */

export const locales = ['es', 'en', 'ar'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export default getRequestConfig(async ({ locale }) => {
  // Validar que el locale es soportado
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

// Utilidad para obtener el locale alternativo (para hreflang)
export function getAlternateLocale(currentLocale: Locale): Locale {
  return currentLocale === 'es' ? 'en' : 'es';
}

// Nombres de los locales en su idioma nativo
export const localeNames: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
  ar: 'العربية',
};

// Idiomas RTL
export const rtlLocales: Locale[] = ['ar'];

