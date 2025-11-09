import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ArticleDetail from '@/components/pages/ArticleDetail';
import { generatePageMetadata, generateArticleSchema } from '@/lib/seo';
import type { Locale } from '@/i18n';

export const dynamic = 'force-dynamic';

interface RamadanGuidePageProps {
  params: {
    locale: string;
  };
}

export async function generateMetadata({
  params: { locale },
}: RamadanGuidePageProps): Promise<Metadata> {
  const title = locale === 'es' ? 'Guía Completa de Ramadán 2025' : locale === 'ar' ? 'دليل رمضان الشامل 2025' : 'Complete Ramadan 2025 Guide';
  
  return generatePageMetadata({
    title,
    description: locale === 'es'
      ? 'Todo lo que necesitas saber para aprovechar el mes sagrado de Ramadán al máximo. Guía práctica y espiritual.'
      : locale === 'ar'
      ? 'كل ما تحتاج معرفته للاستفادة القصوى من الشهر الفضيل رمضان. دليل عملي وروحي.'
      : 'Everything you need to know to make the most of the sacred month of Ramadan. Practical and spiritual guide.',
    locale: locale as Locale,
    path: '/read/guia-ramadan-2025',
  });
}

export default async function RamadanGuidePage({
  params: { locale },
}: RamadanGuidePageProps) {
  const mockArticle = {
    id: 'ramadan-guide-2025',
    title: locale === 'es' ? 'Guía Completa de Ramadán 2025' : locale === 'ar' ? 'دليل رمضان الشامل 2025' : 'Complete Ramadan 2025 Guide',
    slug: 'guia-ramadan-2025',
    excerpt: locale === 'es'
      ? 'Una guía práctica y espiritual para aprovechar al máximo el mes sagrado de Ramadán. Desde la preparación hasta Eid al-Fitr.'
      : locale === 'ar'
      ? 'دليل عملي وروحي للاستفادة القصوى من الشهر الفضيل رمضان. من التحضير إلى عيد الفطر.'
      : 'A practical and spiritual guide to make the most of the sacred month of Ramadan. From preparation to Eid al-Fitr.',
    body: locale === 'es' ? `
# Guía Completa de Ramadán 2025

Ramadán es el noveno mes del calendario islámico y el más sagrado para los musulmanes. Durante este mes, millones de musulmanes alrededor del mundo ayunan desde el amanecer hasta el atardecer.

## ¿Qué es Ramadán?

Ramadán es el mes en el que el Corán fue revelado al Profeta Muhammad ﷺ. Es un tiempo de:
- **Ayuno** (Sawm) - Abstenerse de comer y beber
- **Oración** - Especialmente las oraciones nocturnas (Tarawih)
- **Reflexión** - Lectura y meditación del Corán
- **Caridad** - Generosidad con los necesitados
- **Autodisciplina** - Control de los deseos y pasiones

## Preparación para Ramadán

### 1. Preparación Espiritual
- Hacer tawbah (arrepentimiento sincero)
- Establecer metas espirituales
- Planificar lectura del Corán completo
- Identificar malos hábitos a eliminar

### 2. Preparación Física
- Ajustar horarios de sueño gradualmente
- Planificar menús de suhoor e iftar
- Consultar con médico si tienes condiciones especiales
- Organizarhorarios de trabajo/estudio

### 3. Preparación Social
- Informar a familiares y compañeros
- Planificar actividades familiares
- Coordinar iftares comunitarios
- Preparar donaciones (Zakat al-Fitr)

## Durante Ramadán

### El Ayuno (Sawm)
**Suhoor** (comida pre-amanecer):
- Levantarse temprano
- Comer alimentos nutritivos y de digestión lenta
- Hidratarse bien
- Hacer dua antes del Fajr

**Durante el día**:
- Mantener la intención del ayuno
- Evitar todo lo que rompe el ayuno
- Aumentar dhikr y lectura de Corán
- Controlar el habla y los pensamientos

**Iftar** (romper el ayuno):
- Romper con dátiles y agua
- Hacer dua antes de comer
- Comer con moderación
- Orar Maghrib antes de la comida principal

### Oraciones Especiales

**Tarawih**:
- Oración nocturna especial de Ramadán
- 8-20 rakats después de Isha
- Oportunidad de escuchar el Corán completo

**Qiyam al-Layl**:
- Oración voluntaria de la noche
- Especialmente valiosa en Ramadán
- En el último tercio de la noche

### Lectura del Corán
- Objetivo: Completar el Corán (30 juz)
- Planificar 1 juz por día
- Con reflexión (tadabbur), no solo recitación
- Usar tafsir para entender mejor

### Caridad y Generosidad
- Zakat al-Mal (si es debido)
- Sadaqah diaria
- Alimentar a quienes ayunan
- Ayudar a la comunidad

## Los Últimos 10 Días

Los últimos 10 días de Ramadán son los más importantes:

### Laylat al-Qadr (Noche del Decreto)
- La mejor noche del año
- Probablemente en las noches impares (21, 23, 25, 27, 29)
- Valor de más de 1000 meses
- Buscarla con oración intensa

### I'tikaf (Retiro Espiritual)
- Quedarse en la mezquita los últimos 10 días
- Dedicación total a la adoración
- Alejarse de distracciones mundanas

## Eid al-Fitr

El final de Ramadán se celebra con Eid al-Fitr:

**Antes del Eid**:
- Pagar Zakat al-Fitr (obligatorio)
- Preparar ropa nueva/limpia
- Planificar celebración familiar

**Día del Eid**:
- Ghusl (baño ritual)
- Desayunar antes de la oración
- Salat al-Eid en congregación
- Felicitarse mutuamente
- Visitar familia y amigos
- Compartir comida y alegría

## Consejos Prácticos

### Para el Trabajo/Estudio
- Comunicar tus necesidades
- Planificar descansos para oración
- Ajustar horarios si es posible
- Mantener productividad

### Para la Salud
- Hidratarse bien en suhoor e iftar
- Dieta balanceada
- Evitar excesos en iftar
- Descanso adecuado

### Para la Familia
- Involucrar a los niños
- Actividades educativas sobre Ramadán
- Iftares familiares
- Caridad en familia

## Ramadán 2025: Fechas Estimadas

**Inicio**: Aproximadamente 28 de febrero de 2025
**Fin**: Aproximadamente 29 de marzo de 2025
*(Sujeto a avistamiento de la luna)*

## Dua Recomendados

**Dua al romper el ayuno**:
> "Dhahaba al-zama'u, wa abtalat al-'urooq, wa thabata al-ajru in sha Allah"
> (Se fue la sed, se hidrataron las venas, y se estableció la recompensa, si Dios quiere)

**Dua para Laylat al-Qadr**:
> "Allahumma innaka 'afuwwun tuhibbu al-'afwa fa'fu 'anni"
> (Oh Allah, Tú eres Perdonador y amas el perdón, así que perdóname)

## Conclusión

Ramadán es una bendición y una oportunidad única para renovación espiritual, crecimiento personal y conexión con Allah. Aprovecha cada momento de este mes sagrado.

Que Allah acepte nuestro ayuno, nuestras oraciones y nuestras buenas obras. Amén.
    ` : locale === 'ar' ? `
# دليل رمضان الشامل 2025

رمضان هو الشهر التاسع من التقويم الإسلامي والأكثر قدسية للمسلمين.

## ما هو رمضان؟

رمضان هو الشهر الذي أنزل فيه القرآن على النبي محمد ﷺ.

## التحضير لرمضان

### التحضير الروحي
- التوبة الصادقة
- وضع أهداف روحانية
- التخطيط لقراءة القرآن كاملاً

### التحضير الجسدي
- تعديل أوقات النوم تدريجيًا
- تخطيط وجبات السحور والإفطار

## خلال رمضان

### الصيام
**السحور**:
- الاستيقاظ مبكرًا
- تناول طعام مغذي
- شرب الماء جيدًا

**الإفطار**:
- الإفطار بالتمر والماء
- الدعاء قبل الأكل
- صلاة المغرب
    ` : `
# Complete Ramadan 2025 Guide

Ramadan is the ninth month of the Islamic calendar and the holiest for Muslims. During this month, millions of Muslims around the world fast from dawn to sunset.

## What is Ramadan?

Ramadan is the month in which the Quran was revealed to Prophet Muhammad ﷺ. It is a time of:
- **Fasting** (Sawm) - Abstaining from food and drink
- **Prayer** - Especially night prayers (Tarawih)
- **Reflection** - Reading and meditation of the Quran
- **Charity** - Generosity to those in need
- **Self-discipline** - Control of desires and passions

## Preparing for Ramadan

### 1. Spiritual Preparation
- Make tawbah (sincere repentance)
- Set spiritual goals
- Plan to read the complete Quran
- Identify bad habits to eliminate

### 2. Physical Preparation
- Gradually adjust sleep schedules
- Plan suhoor and iftar menus
- Consult doctor if you have special conditions
- Organize work/study schedules

### 3. Social Preparation
- Inform family and colleagues
- Plan family activities
- Coordinate community iftars
- Prepare donations (Zakat al-Fitr)

## During Ramadan

### Fasting (Sawm)
**Suhoor** (pre-dawn meal):
- Wake up early
- Eat nutritious, slow-digesting foods
- Hydrate well
- Make dua before Fajr

**During the day**:
- Maintain the intention to fast
- Avoid everything that breaks the fast
- Increase dhikr and Quran reading
- Control speech and thoughts

**Iftar** (breaking the fast):
- Break with dates and water
- Make dua before eating
- Eat in moderation
- Pray Maghrib before main meal

### Special Prayers

**Tarawih**:
- Special Ramadan night prayer
- 8-20 rakats after Isha
- Opportunity to hear the complete Quran

**Qiyam al-Layl**:
- Voluntary night prayer
- Especially valuable in Ramadan
- In the last third of the night

### Quran Reading
- Goal: Complete the Quran (30 juz)
- Plan 1 juz per day
- With reflection (tadabbur), not just recitation
- Use tafsir to understand better

### Charity and Generosity
- Zakat al-Mal (if due)
- Daily sadaqah
- Feed those who are fasting
- Help the community

## The Last 10 Days

The last 10 days of Ramadan are the most important:

### Laylat al-Qadr (Night of Decree)
- The best night of the year
- Probably on odd nights (21, 23, 25, 27, 29)
- Worth more than 1000 months
- Seek it with intense prayer

### I'tikaf (Spiritual Retreat)
- Stay in the mosque the last 10 days
- Total dedication to worship
- Away from worldly distractions

## Eid al-Fitr

The end of Ramadan is celebrated with Eid al-Fitr:

**Before Eid**:
- Pay Zakat al-Fitr (mandatory)
- Prepare new/clean clothes
- Plan family celebration

**Eid Day**:
- Ghusl (ritual bath)
- Breakfast before prayer
- Salat al-Eid in congregation
- Congratulate each other
- Visit family and friends
- Share food and joy

## Practical Tips

### For Work/Study
- Communicate your needs
- Plan breaks for prayer
- Adjust schedules if possible
- Maintain productivity

### For Health
- Hydrate well at suhoor and iftar
- Balanced diet
- Avoid excesses at iftar
- Adequate rest

### For Family
- Involve children
- Educational activities about Ramadan
- Family iftars
- Charity as a family

## Ramadan 2025: Estimated Dates

**Start**: Approximately February 28, 2025
**End**: Approximately March 29, 2025
*(Subject to moon sighting)*

## Recommended Duas

**Dua when breaking fast**:
> "Dhahaba al-zama'u, wa abtalat al-'urooq, wa thabata al-ajru in sha Allah"

**Dua for Laylat al-Qadr**:
> "Allahumma innaka 'afuwwun tuhibbu al-'afwa fa'fu 'anni"

## Conclusion

Ramadan is a blessing and unique opportunity for spiritual renewal, personal growth and connection with Allah. Make the most of every moment of this sacred month.

May Allah accept our fasting, our prayers and our good deeds. Ameen.
    `,
    type: 'blog' as const,
    readingTime: 15,
    publishedAt: '2024-11-08T10:00:00Z',
    updatedAt: '2024-11-08T10:00:00Z',
    cover: {
      id: '1',
      url: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=1200&h=630&fit=crop&crop=center',
      alternativeText: locale === 'es' ? 'Ramadán' : locale === 'ar' ? 'رمضان' : 'Ramadan',
      width: 1200,
      height: 630,
    },
    authors: [
      {
        id: '1',
        name: 'Dr. Ahmad Ibrahim',
        role: locale === 'es' ? 'Investigador Islámico' : locale === 'ar' ? 'باحث إسلامي' : 'Islamic Researcher',
        photo: {
          id: '2',
          url: 'https://i.pravatar.cc/150?img=12',
        },
        shortBio: locale === 'es' 
          ? 'Especialista en estudios islámicos con más de 15 años de experiencia'
          : locale === 'ar'
          ? 'متخصص في الدراسات الإسلامية مع أكثر من 15 عامًا من الخبرة'
          : 'Specialist in Islamic studies with over 15 years of experience',
      },
    ],
    topics: [
      { id: '1', name: locale === 'es' ? 'Ramadán' : locale === 'ar' ? 'رمضان' : 'Ramadan', slug: 'ramadan' },
      { id: '2', name: locale === 'es' ? 'Adoración' : locale === 'ar' ? 'العبادة' : 'Worship', slug: 'worship' },
      { id: '3', name: locale === 'es' ? 'Guías Prácticas' : locale === 'ar' ? 'أدلة عملية' : 'Practical Guides', slug: 'guides' },
    ],
    seo: {
      title: locale === 'es' ? 'Guía Completa de Ramadán 2025' : locale === 'ar' ? 'دليل رمضان 2025' : 'Ramadan 2025 Complete Guide',
      description: locale === 'es'
        ? 'Todo sobre Ramadán: preparación, ayuno, oraciones, caridad y más'
        : locale === 'ar'
        ? 'كل شيء عن رمضان: التحضير والصيام والصلوات والصدقة والمزيد'
        : 'Everything about Ramadan: preparation, fasting, prayers, charity and more',
    },
    locale: locale as Locale,
  };

  return <ArticleDetail article={mockArticle} locale={locale} />;
}

