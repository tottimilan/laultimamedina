import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import RegisterPage from '@/components/pages/auth/RegisterPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Registrarse' : locale === 'ar' ? 'التسجيل' : 'Register',
    description: locale === 'es'
      ? 'Únete a la comunidad de La Última Medina'
      : locale === 'ar'
      ? 'انضم إلى مجتمع المدينة الأخيرة'
      : 'Join La Última Medina community',
    locale: locale as Locale,
    path: '/register',
    noIndex: true,
  });
}

export default function Register() {
  return <RegisterPage />;
}

