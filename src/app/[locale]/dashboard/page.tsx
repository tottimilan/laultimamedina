import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import DashboardPage from '@/components/pages/auth/DashboardPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Mi Dashboard' : locale === 'ar' ? 'لوحة التحكم' : 'My Dashboard',
    description: locale === 'es'
      ? 'Gestiona tu cuenta, favoritos, donaciones y más'
      : locale === 'ar'
      ? 'إدارة حسابك والمفضلة والتبرعات والمزيد'
      : 'Manage your account, favorites, donations and more',
    locale: locale as Locale,
    path: '/dashboard',
    noIndex: true,
  });
}

export default function Dashboard() {
  return <DashboardPage />;
}

