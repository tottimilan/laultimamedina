'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Tagline = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  font-style: italic;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 700px;
  margin: 0 auto;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
  gap: ${({ theme }) => theme.spacing['3xl']};
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

const ExperienceCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: ${({ theme }) => theme.shadows.xl};
    transform: translateY(-6px);
  }
`;

const ExperienceImage = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
  background: ${({ theme }) => theme.colors.background.tertiary};
`;

const Badge = styled.div`
  position: absolute;
  top: ${({ theme }) => theme.spacing.lg};
  left: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.brand.secondary};
  color: ${({ theme }) => theme.colors.brand.dark};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: ${({ theme }) => theme.radii.sm};
  text-transform: uppercase;
`;

const ExperienceContent = styled.div`
  padding: ${({ theme }) => theme.spacing['2xl']};
`;

const ExperienceTitle = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const ExperienceDescription = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const ExperienceMeta = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  padding: ${({ theme }) => theme.spacing.lg} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const BookButton = styled(Link)`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.accent};
  }
`;

export default function ExperienciasHub() {
  const locale = useLocale();

  const experiences = [
    {
      id: 'toledo',
      city: 'Toledo',
      title: locale === 'es' ? 'Toledo Islámico' : locale === 'ar' ? 'طليطلة الإسلامية' : 'Islamic Toledo',
      description: locale === 'es'
        ? 'Caminar por Toledo es entrar en un laberinto donde las piedras aún susurran historias. Sus mezquitas escondidas, sus murallas y callejuelas quieren contarte un secreto ¿Quieres escucharlo?'
        : locale === 'ar'
        ? 'المشي في طليطلة هو الدخول إلى متاهة حيث لا تزال الحجارة تهمس بالقصص. مساجدها المخفية وأسوارها وأزقتها تريد أن تخبرك بسر. هل تريد سماعه؟'
        : 'Walking through Toledo is entering a labyrinth where stones still whisper stories. Its hidden mosques, walls and alleys want to tell you a secret. Do you want to hear it?',
      image: 'https://images.unsplash.com/photo-1558114965-eeb97aa84c3b',
      duration: locale === 'es' ? '3 horas' : locale === 'ar' ? '3 ساعات' : '3 hours',
      nextDate: locale === 'es' ? 'Próximo: 15 noviembre' : locale === 'ar' ? 'القادم: 15 نوفمبر' : 'Next: Nov 15',
    },
    {
      id: 'madrid',
      city: 'Madrid',
      title: locale === 'es' ? 'Madrid Islámico' : locale === 'ar' ? 'مدريد الإسلامية' : 'Islamic Madrid',
      description: locale === 'es'
        ? 'Bajo el ritmo de la gran ciudad moderna, Madrid conserva memorias de Al-Ándalus. Siendo la única capital de origen islámico de Europa tiene un pasado que se niega a ser olvidado. Una experiencia por la otra cara de la capital.'
        : locale === 'ar'
        ? 'تحت إيقاع المدينة الكبرى الحديثة، تحتفظ مدريد بذكريات الأندلس. كونها العاصمة الأوروبية الوحيدة ذات الأصل الإسلامي، لديها ماضٍ يرفض أن يُنسى. تجربة عبر الوجه الآخر للعاصمة.'
        : 'Under the rhythm of the great modern city, Madrid preserves memories of Al-Andalus. Being the only European capital of Islamic origin, it has a past that refuses to be forgotten. An experience through the other face of the capital.',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4',
      duration: locale === 'es' ? '2.5 horas' : locale === 'ar' ? '2.5 ساعة' : '2.5 hours',
      nextDate: locale === 'es' ? 'Próximo: 22 noviembre' : locale === 'ar' ? 'القادم: 22 نوفمبر' : 'Next: Nov 22',
    },
  ];

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>
            {locale === 'es' ? 'Rutas Históricas' : locale === 'ar' ? 'الجولات التاريخية' : 'Historical Routes'}
          </Title>
          <Tagline>
            {locale === 'es'
              ? 'Recorrer la historia es otra forma de recordarnos quiénes somos.'
              : locale === 'ar'
              ? 'السير في التاريخ طريقة أخرى لتذكر من نحن.'
              : 'Walking through history is another way to remember who we are.'}
          </Tagline>
          <Subtitle>
            {locale === 'es'
              ? 'Una vez al mes lanzamos nuestras experiencias históricas, no te las pierdas.'
              : locale === 'ar'
              ? 'مرة واحدة في الشهر نطلق تجاربنا التاريخية، لا تفوتها.'
              : 'Once a month we launch our historical experiences, don\'t miss them.'}
          </Subtitle>
        </Header>

        <Grid>
          {experiences.map((exp, index) => (
            <ExperienceCard
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <ExperienceImage>
                <Badge>
                  {locale === 'es' ? 'Ruta Histórica' : locale === 'ar' ? 'جولة تاريخية' : 'Historical Route'}
                </Badge>
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </ExperienceImage>
              
              <ExperienceContent>
                <ExperienceTitle>{exp.title}</ExperienceTitle>
                <ExperienceDescription>{exp.description}</ExperienceDescription>
                
                <ExperienceMeta>
                  <span>{exp.duration}</span>
                  <span>•</span>
                  <span>{exp.nextDate}</span>
                </ExperienceMeta>
                
                <BookButton href={`/${locale}/experiencias/${exp.id}`}>
                  {locale === 'es' ? 'Más información' : locale === 'ar' ? 'معلومات أكثر' : 'More info'}
                </BookButton>
              </ExperienceContent>
            </ExperienceCard>
          ))}
        </Grid>
      </Container>
    </MainLayout>
  );
}

