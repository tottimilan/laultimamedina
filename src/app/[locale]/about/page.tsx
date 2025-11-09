import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

/**
 * Redireccionar /about a /about/mission
 */
export default function AboutPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  redirect(`/${locale}/about/mission`);
}

