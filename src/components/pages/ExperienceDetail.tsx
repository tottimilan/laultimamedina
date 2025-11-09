'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

const Hero = styled.div`
  position: relative;
  height: 500px;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
  }
`;

const HeroOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: ${({ theme }) => theme.spacing['3xl']} ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
  color: white;
  z-index: 1;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.spacing.xl} ${({ theme }) => theme.spacing['4xl']};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: ${({ theme }) => theme.spacing['3xl']};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: 1fr;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div``;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.extrabold};
  margin-bottom: ${({ theme }) => theme.spacing.md};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const Tagline = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  opacity: 0.95;
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  padding-bottom: ${({ theme }) => theme.spacing.sm};
  border-bottom: 2px solid ${({ theme }) => theme.colors.brand.secondary};
`;

const Description = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const HighlightItem = styled.li`
  display: flex;
  align-items: start;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.md};
  
  &::before {
    content: '✓';
    color: ${({ theme }) => theme.colors.brand.primary};
    font-weight: bold;
    font-size: 1.25rem;
  }
`;

const Itinerary = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.md};
  padding: ${({ theme }) => theme.spacing['2xl']};
  
  h1, h2, h3 {
    color: ${({ theme }) => theme.colors.brand.dark};
    margin-top: ${({ theme }) => theme.spacing.lg};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
`;

const InfoCard = styled.div`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  position: sticky;
  top: 100px;
`;

const PriceTag = styled.div`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.primary};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacing.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  
  &:last-child {
    border-bottom: none;
  }
  
  strong {
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  span {
    color: ${({ theme }) => theme.colors.text.secondary};
  }
`;

const BookButton = styled.button`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.accent};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const GalleryImage = styled.div`
  position: relative;
  height: 200px;
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  cursor: pointer;
  
  &:hover {
    opacity: 0.9;
  }
`;

const List = styled.ul`
  list-style: disc;
  padding-left: ${({ theme }) => theme.spacing.xl};
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
  }
`;

interface ExperienceDetailProps {
  experience: any;
  locale: string;
}

export default function ExperienceDetail({ experience, locale }: ExperienceDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  const handleBooking = () => {
    // TODO: Abrir modal de reserva o redirigir a formulario
    window.open(`https://forms.gle/tu-formulario-de-reserva`, '_blank');
  };

  return (
    <MainLayout>
      <Hero>
        <Image
          src={experience.images[selectedImage]}
          alt={experience.title}
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <HeroOverlay>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Title>{experience.title}</Title>
            <Tagline>{experience.tagline}</Tagline>
          </motion.div>
        </HeroOverlay>
      </Hero>

      <Container>
        <Grid>
          <MainContent>
            {experience.images.length > 1 && (
              <Section>
                <Gallery>
                  {experience.images.map((img: string, index: number) => (
                    <GalleryImage key={index} onClick={() => setSelectedImage(index)}>
                      <Image
                        src={img}
                        alt={`${experience.city} ${index + 1}`}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </GalleryImage>
                  ))}
                </Gallery>
              </Section>
            )}

            <Section>
              <SectionTitle>
                {locale === 'es' ? 'Sobre esta Experiencia' : locale === 'ar' ? 'حول هذه التجربة' : 'About this Experience'}
              </SectionTitle>
              <Description>{experience.description}</Description>
            </Section>

            <Section>
              <SectionTitle>
                {locale === 'es' ? 'Puntos Destacados' : locale === 'ar' ? 'النقاط البارزة' : 'Highlights'}
              </SectionTitle>
              <HighlightsList>
                {experience.highlights.map((highlight: string, index: number) => (
                  <HighlightItem key={index}>{highlight}</HighlightItem>
                ))}
              </HighlightsList>
            </Section>

            <Section>
              <SectionTitle>
                {locale === 'es' ? 'Itinerario Detallado' : locale === 'ar' ? 'المسار التفصيلي' : 'Detailed Itinerary'}
              </SectionTitle>
              <Itinerary>
                <ReactMarkdown>{experience.itinerary}</ReactMarkdown>
              </Itinerary>
            </Section>

            <Section>
              <SectionTitle>
                {locale === 'es' ? 'Qué Incluye' : locale === 'ar' ? 'ما يشمل' : 'What\'s Included'}
              </SectionTitle>
              <List>
                {experience.whatIncluded.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </List>
            </Section>

            <Section>
              <SectionTitle>
                {locale === 'es' ? 'Qué Traer' : locale === 'ar' ? 'ما تحضر' : 'What to Bring'}
              </SectionTitle>
              <List>
                {experience.whatToBring.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </List>
            </Section>
          </MainContent>

          <Sidebar>
            <InfoCard>
              <PriceTag>{experience.price}€</PriceTag>
              
              <InfoItem>
                <strong>{locale === 'es' ? 'Duración:' : locale === 'ar' ? 'المدة:' : 'Duration:'}</strong>
                <span>{experience.duration}</span>
              </InfoItem>
              
              <InfoItem>
                <strong>{locale === 'es' ? 'Próxima fecha:' : locale === 'ar' ? 'التاريخ القادم:' : 'Next date:'}</strong>
                <span>{new Date(experience.nextDate).toLocaleDateString(locale === 'es' ? 'es-ES' : locale === 'ar' ? 'ar-SA' : 'en-US')}</span>
              </InfoItem>
              
              <InfoItem>
                <strong>{locale === 'es' ? 'Punto de encuentro:' : locale === 'ar' ? 'نقطة اللقاء:' : 'Meeting point:'}</strong>
                <span>{experience.meetingPoint}</span>
              </InfoItem>
              
              <InfoItem>
                <strong>{locale === 'es' ? 'Plazas:' : locale === 'ar' ? 'الأماكن:' : 'Spots:'}</strong>
                <span>{locale === 'es' ? 'Máximo' : locale === 'ar' ? 'الحد الأقصى' : 'Max'} {experience.maxParticipants}</span>
              </InfoItem>

              <BookButton onClick={handleBooking}>
                {locale === 'es' ? 'Reservar Plaza' : locale === 'ar' ? 'احجز مكانك' : 'Book Your Spot'}
              </BookButton>
            </InfoCard>
          </Sidebar>
        </Grid>
      </Container>
    </MainLayout>
  );
}

