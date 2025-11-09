import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import VolunteerPage from '@/components/pages/VolunteerPage';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return generatePageMetadata({
    title: locale === 'es' ? 'Voluntariado' : locale === 'ar' ? 'التطوع' : 'Volunteer',
    description: locale === 'es' 
      ? 'Únete como voluntario y ayuda a difundir el conocimiento islámico'
      : locale === 'ar'
      ? 'انضم كمتطوع وساعد في نشر المعرفة الإسلامية'
      : 'Join as a volunteer and help spread Islamic knowledge',
    locale: locale as Locale,
    path: '/volunteer',
  });
}

export default function Volunteer() {
  return <VolunteerPage />;
}

