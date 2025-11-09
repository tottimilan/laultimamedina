import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import SearchResults from '@/components/pages/SearchResults';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
  searchParams,
}: {
  params: { locale: string };
  searchParams: { q?: string };
}): Promise<Metadata> {
  const query = searchParams.q || '';
  
  return generatePageMetadata({
    title: query ? `${locale === 'es' ? 'Resultados para' : 'Results for'}: ${query}` : (locale === 'es' ? 'Buscar' : 'Search'),
    description: locale === 'es' ? 'Busca en todo nuestro contenido' : 'Search all our content',
    locale: locale as Locale,
    path: '/search',
    noIndex: true, // No indexar páginas de búsqueda
  });
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string; type?: string };
}) {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}

