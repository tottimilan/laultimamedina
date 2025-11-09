import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ExperienceDetail from '@/components/pages/ExperienceDetail';
import { generatePageMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

interface ExperiencePageProps {
  params: {
    locale: string;
    slug: string;
  };
}

export async function generateMetadata({
  params: { locale, slug },
}: ExperiencePageProps): Promise<Metadata> {
  // TODO: Cuando Strapi esté configurado, obtener datos reales
  
  return generatePageMetadata({
    title: slug === 'toledo-islamico' 
      ? (locale === 'es' ? 'Toledo Islámico' : locale === 'ar' ? 'طليطلة الإسلامية' : 'Islamic Toledo')
      : (locale === 'es' ? 'Madrid Islámico' : locale === 'ar' ? 'مدريد الإسلامية' : 'Islamic Madrid'),
    description: locale === 'es' 
      ? 'Ruta histórica por el legado islámico en España'
      : locale === 'ar'
      ? 'جولة تاريخية في الإرث الإسلامي في إسبانيا'
      : 'Historical tour through Islamic legacy in Spain',
    locale: locale as Locale,
    path: `/experiencias/${slug}`,
  });
}

export default async function ExperiencePage({
  params: { locale, slug },
}: ExperiencePageProps) {
  // TODO: Conectar con Strapi cuando esté configurado
  // const experience = await getExperienceBySlug(slug, locale as Locale);
  // if (!experience) notFound();

  const mockExperience = slug === 'toledo-islamico' ? {
    id: 'toledo',
    city: 'Toledo',
    title: locale === 'es' ? 'Toledo Islámico' : locale === 'ar' ? 'طليطلة الإسلامية' : 'Islamic Toledo',
    tagline: locale === 'es' 
      ? 'Caminar por Toledo es entrar en un laberinto donde las piedras aún susurran historias'
      : locale === 'ar'
      ? 'المشي في طليطلة هو الدخول إلى متاهة حيث لا تزال الحجارة تهمس بالقصص'
      : 'Walking through Toledo is entering a labyrinth where stones still whisper stories',
    description: locale === 'es'
      ? 'Descubre el legado islámico de Toledo, la ciudad de las tres culturas. Sus mezquitas escondidas, murallas medievales y callejuelas estrechas guardan siglos de historia andalusí.'
      : locale === 'ar'
      ? 'اكتشف الإرث الإسلامي لطليطلة، مدينة الثقافات الثلاث. مساجدها المخفية وأسوارها وأزقتها تحتفظ بقرون من تاريخ الأندلس.'
      : 'Discover the Islamic legacy of Toledo, the city of three cultures. Its hidden mosques, medieval walls and narrow alleys hold centuries of Andalusian history.',
    images: [
      'https://images.unsplash.com/photo-1558114965-eeb97aa84c3b',
      'https://images.unsplash.com/photo-1562964403-415f4f2d6a58',
    ],
    duration: locale === 'es' ? '3 horas' : locale === 'ar' ? '3 ساعات' : '3 hours',
    price: 25,
    maxParticipants: 20,
    nextDate: '2024-11-15',
    meetingPoint: locale === 'es' 
      ? 'Puerta de Bisagra, Toledo'
      : locale === 'ar'
      ? 'باب بيساغرا، طليطلة'
      : 'Puerta de Bisagra, Toledo',
    highlights: locale === 'es' ? [
      'Visita a mezquitas históricas',
      'Paseo por la judería',
      'Murallas y torres medievales',
      'Historia de las tres culturas',
    ] : locale === 'ar' ? [
      'زيارة المساجد التاريخية',
      'جولة في الحي اليهودي',
      'الأسوار والأبراج الوسطى',
      'تاريخ الثقافات الثلاث',
    ] : [
      'Visit to historical mosques',
      'Walk through the Jewish quarter',
      'Medieval walls and towers',
      'History of three cultures',
    ],
    itinerary: locale === 'es' ? `
# Itinerario

## 10:00 - Punto de Encuentro
Nos encontramos en la Puerta de Bisagra, una de las entradas más impresionantes a la ciudad medieval.

## 10:30 - Mezquita del Cristo de la Luz
Visitamos una de las diez mezquitas que aún se conservan de la época andalusí. Construida en el año 999.

## 11:30 - La Judería
Recorremos el barrio judío, con sus calles estrechas y sinuosas que mantienen el trazado medieval.

## 12:30 - Murallas y Torres
Caminamos junto a las murallas que protegieron Toledo durante siglos. Vistas panorámicas de la ciudad.

## 13:00 - Fin del Tour
Conclusión frente a la Catedral, con tiempo para preguntas y recomendaciones.
    ` : locale === 'ar' ? `
# المسار

## 10:00 - نقطة اللقاء
نلتقي في باب بيساغرا، أحد المداخل الأكثر إثارة للإعجاب للمدينة الوسطى.

## 10:30 - مسجد Cristo de la Luz
نزور أحد المساجد العشرة المحفوظة من العصر الأندلسي. بني عام 999.

## 11:30 - الحي اليهودي
نسير في الحي اليهودي بشوارعه الضيقة والمتعرجة.

## 12:30 - الأسوار والأبراج
نمشي بجوار الأسوار التي حمت طليطلة لقرون. إطلالات بانورامية على المدينة.

## 13:00 - نهاية الجولة
الختام أمام الكاتدرائية، مع وقت للأسئلة والتوصيات.
    ` : `
# Itinerary

## 10:00 - Meeting Point
We meet at Puerta de Bisagra, one of the most impressive entrances to the medieval city.

## 10:30 - Cristo de la Luz Mosque
We visit one of the ten mosques still preserved from the Andalusian era. Built in 999 AD.

## 11:30 - The Jewish Quarter
We walk through the Jewish quarter, with its narrow and winding streets that maintain the medieval layout.

## 12:30 - Walls and Towers
We walk along the walls that protected Toledo for centuries. Panoramic views of the city.

## 13:00 - End of Tour
Conclusion in front of the Cathedral, with time for questions and recommendations.
    `,
    whatIncluded: locale === 'es' ? [
      'Guía profesional especializado',
      'Entrada a la Mezquita del Cristo de la Luz',
      'Material didáctico',
      'Seguro de responsabilidad civil',
    ] : locale === 'ar' ? [
      'مرشد محترف متخصص',
      'الدخول إلى المسجد',
      'مواد تعليمية',
      'تأمين المسؤولية المدنية',
    ] : [
      'Professional specialized guide',
      'Entrance to Cristo de la Luz Mosque',
      'Educational materials',
      'Civil liability insurance',
    ],
    whatToBring: locale === 'es' ? [
      'Calzado cómodo',
      'Agua',
      'Protección solar',
      'Cámara (opcional)',
    ] : locale === 'ar' ? [
      'أحذية مريحة',
      'ماء',
      'واقي شمسي',
      'كاميرا (اختياري)',
    ] : [
      'Comfortable shoes',
      'Water',
      'Sun protection',
      'Camera (optional)',
    ],
  } : {
    id: 'madrid',
    city: 'Madrid',
    title: locale === 'es' ? 'Madrid Islámico' : locale === 'ar' ? 'مدريد الإسلامية' : 'Islamic Madrid',
    tagline: locale === 'es'
      ? 'Bajo el ritmo de la gran ciudad moderna, Madrid conserva memorias de Al-Ándalus'
      : locale === 'ar'
      ? 'تحت إيقاع المدينة الكبرى الحديثة، تحتفظ مدريد بذكريات الأندلس'
      : 'Under the rhythm of the great modern city, Madrid preserves memories of Al-Andalus',
    description: locale === 'es'
      ? 'Madrid, la única capital europea de origen islámico, esconde un pasado andalusí que se niega a ser olvidado. Descubre la otra cara de la capital.'
      : locale === 'ar'
      ? 'مدريد، العاصمة الأوروبية الوحيدة ذات الأصل الإسلامي، تخفي ماضيًا أندلسيًا يرفض أن يُنسى.'
      : 'Madrid, the only European capital of Islamic origin, hides an Andalusian past that refuses to be forgotten.',
    images: [
      'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
      'https://images.unsplash.com/photo-1562964403-415f4f2d6a58',
    ],
    duration: locale === 'es' ? '2.5 horas' : locale === 'ar' ? '2.5 ساعة' : '2.5 hours',
    price: 20,
    maxParticipants: 25,
    nextDate: '2024-11-22',
    meetingPoint: locale === 'es'
      ? 'Plaza de la Armería (Palacio Real)'
      : locale === 'ar'
      ? 'ساحة الأسلحة (القصر الملكي)'
      : 'Plaza de la Armería (Royal Palace)',
    highlights: locale === 'es' ? [
      'Muralla árabe de Madrid',
      'Iglesia de San Nicolás (antigua mezquita)',
      'Almudena: de almudayna a catedral',
      'Barrio de la Morería',
    ] : locale === 'ar' ? [
      'سور مدريد العربي',
      'كنيسة سان نيكولاس (المسجد القديم)',
      'ألمودينا: من القلعة إلى الكاتدرائية',
      'حي لا موريريا',
    ] : [
      'Arabic wall of Madrid',
      'San Nicolás Church (former mosque)',
      'Almudena: from almudayna to cathedral',
      'La Morería neighborhood',
    ],
    itinerary: locale === 'es' ? `
# Itinerario

## 11:00 - Palacio Real
Comenzamos en la Plaza de la Armería, sobre el antiguo alcázar islámico.

## 11:30 - Muralla Árabe
Descendemos para ver los restos de la muralla del siglo IX, origen de Madrid.

## 12:00 - San Nicolás
Visitamos la iglesia más antigua de Madrid, construida sobre una mezquita.

## 12:45 - La Morería
Recorremos el barrio donde vivió la comunidad mudéjar tras la reconquista.

## 13:30 - Fin del Tour
Conclusión con tiempo para preguntas y cafecito árabe (opcional).
    ` : locale === 'ar' ? `
# المسار

## 11:00 - القصر الملكي
نبدأ في ساحة الأسلحة، على القصر الإسلامي القديم.

## 11:30 - السور العربي
ننزل لرؤية بقايا السور من القرن التاسع، أصل مدريد.

## 12:00 - سان نيكولاس
نزور أقدم كنيسة في مدريد، بنيت على مسجد.

## 12:45 - لا موريريا
نسير في الحي حيث عاش المجتمع المدجن بعد الاسترداد.

## 13:30 - نهاية الجولة
الختام مع وقت للأسئلة وقهوة عربية (اختياري).
    ` : `
# Itinerary

## 11:00 - Royal Palace
We start at Plaza de la Armería, on the site of the ancient Islamic alcazar.

## 11:30 - Arabic Wall
We descend to see the remains of the 9th century wall, the origin of Madrid.

## 12:00 - San Nicolás
We visit the oldest church in Madrid, built on a mosque.

## 12:45 - La Morería
We walk through the neighborhood where the Mudejar community lived after the reconquest.

## 13:30 - End of Tour
Conclusion with time for questions and Arabic coffee (optional).
    `,
    whatIncluded: locale === 'es' ? [
      'Guía historiador especializado',
      'Entrada a San Nicolás',
      'Mapa de la ruta',
      'Degustación de té moruno',
    ] : locale === 'ar' ? [
      'مرشد مؤرخ متخصص',
      'الدخول إلى سان نيكولاس',
      'خريطة الطريق',
      'تذوق الشاي المغربي',
    ] : [
      'Specialized historian guide',
      'Entrance to San Nicolás',
      'Route map',
      'Moorish tea tasting',
    ],
    whatToBring: locale === 'es' ? [
      'Calzado cómodo para caminar',
      'Botella de agua',
      'Protección solar (verano)',
      'Curiosidad y ganas de aprender',
    ] : locale === 'ar' ? [
      'أحذية مريحة للمشي',
      'زجاجة ماء',
      'واقي شمسي (الصيف)',
      'فضول ورغبة في التعلم',
    ] : [
      'Comfortable walking shoes',
      'Water bottle',
      'Sun protection (summer)',
      'Curiosity and desire to learn',
    ],
  };

  return <ExperienceDetail experience={mockExperience} locale={locale} />;
}

