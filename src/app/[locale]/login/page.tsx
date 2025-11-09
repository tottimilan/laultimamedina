import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import LoginPage from '@/components/pages/auth/LoginPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Iniciar Sesión' : locale === 'ar' ? 'تسجيل الدخول' : 'Sign In',
    description: locale === 'es'
      ? 'Accede a tu cuenta de miembro de La Última Medina'
      : locale === 'ar'
      ? 'الوصول إلى حساب عضوك في المدينة الأخيرة'
      : 'Access your La Última Medina member account',
    locale: locale as Locale,
    path: '/login',
    noIndex: true,
  });
}

export default function Login() {
  return <LoginPage />;
}

