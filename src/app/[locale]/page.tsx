import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import HomePage from '@/components/pages/HomePage';

/**
 * Página de inicio / Home
 */

// Forzar renderizado dinámico por el uso de Client Components
export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'home' });
  
  return {
    title: t('hero.title'),
    description: t('hero.subtitle'),
  };
}

export default function Page() {
  return <HomePage />;
}

