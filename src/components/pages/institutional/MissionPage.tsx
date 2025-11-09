'use client';

import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['5xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
  }
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.brand.dark};
    margin: ${({ theme }) => theme.spacing['3xl']} 0 ${({ theme }) => theme.spacing.xl};
  }
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.brand.primary};
    margin: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing.lg};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.xl};
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: ${({ theme }) => theme.spacing.xl} 0;
  }
  
  li {
    padding: ${({ theme }) => theme.spacing.md} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
    position: relative;
    
    &::before {
      content: '✓';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.brand.primary};
      font-weight: bold;
      font-size: ${({ theme }) => theme.fontSizes.xl};
    }
  }
`;

const HighlightBox = styled.div`
  background: ${({ theme }) => theme.colors.brand.primary}10;
  border-left: 4px solid ${({ theme }) => theme.colors.brand.primary};
  padding: ${({ theme }) => theme.spacing['2xl']};
  margin: ${({ theme }) => theme.spacing['3xl']} 0;
  border-radius: ${({ theme }) => theme.radii.md};
`;

const Quote = styled.blockquote`
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  font-style: italic;
  color: ${({ theme }) => theme.colors.brand.dark};
  text-align: center;
  padding: ${({ theme }) => theme.spacing['3xl']} 0;
  margin: ${({ theme }) => theme.spacing['4xl']} 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

export default function MissionPage() {
  const locale = useLocale();

  return (
    <MainLayout>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Header>
            <Title>
              {locale === 'es' ? 'Nosotros' : locale === 'ar' ? 'من نحن' : 'About Us'}
            </Title>
            <Subtitle>
              {locale === 'es' 
                ? '¿Quiénes somos?'
                : locale === 'ar'
                ? 'من نحن؟'
                : 'Who are we?'}
            </Subtitle>
          </Header>

          <Content>
            {locale === 'es' ? (
              <>
                <p>
                  <strong>La Última Medina</strong> es una asociación que nació con una idea sencilla: 
                  crear un espacio donde hablar de historia, religión y filosofía en nuestra lengua, 
                  un espacio donde se puedan hacer las preguntas importantes.
                </p>

                <HighlightBox>
                  <h3>Nuestra Visión</h3>
                  <p>
                    Ser la fuente de referencia en español para conocimiento islámico riguroso, 
                    inspirando una generación de musulmanes informados, comprometidos y capaces 
                    de contribuir positivamente a sus comunidades.
                  </p>
                </HighlightBox>

                <h2>Nuestros Valores Fundamentales</h2>

                <h3>🎯 Rigor Académico</h3>
                <p>
                  Todo nuestro contenido está basado en fuentes auténticas del Islam: el Corán, 
                  la Sunnah del Profeta Muhammad ﷺ, y el consenso de los eruditos reconocidos. 
                  Colaboramos con académicos cualificados para garantizar la precisión y 
                  autenticidad de cada artículo, vídeo y podcast.
                </p>

                <h3>🌍 Accesibilidad Universal</h3>
                <p>
                  Creemos que el conocimiento islámico no debe estar limitado por barreras 
                  lingüísticas, económicas o geográficas. Por eso ofrecemos todo nuestro 
                  contenido de forma gratuita, en múltiples idiomas, y optimizado para 
                  cualquier dispositivo.
                </p>

                <h3>💡 Relevancia Contemporánea</h3>
                <p>
                  Abordamos las preguntas y desafíos que los musulmanes enfrentan en el 
                  mundo actual, desde la ética en la tecnología hasta la justicia social, 
                  siempre fundamentados en las enseñanzas atemporales del Islam.
                </p>

                <h3>🤝 Comunidad y Diálogo</h3>
                <p>
                  Fomentamos un espacio de aprendizaje respetuoso donde las preguntas son 
                  bienvenidas y el diálogo constructivo es valorado. Creemos en el poder 
                  transformador de la conversación informada.
                </p>

                <Quote>
                  "Buscar el conocimiento es una obligación para todo musulmán."
                  <br />
                  <small style={{ fontSize: '1rem', opacity: 0.8 }}>— Hadiz del Profeta Muhammad ﷺ</small>
                </Quote>

                <h2>Nuestro Compromiso</h2>

                <p>Nos comprometemos a:</p>

                <ul>
                  <li>Producir contenido de la más alta calidad académica</li>
                  <li>Mantener nuestra independencia editorial</li>
                  <li>Ser transparentes sobre nuestras fuentes y metodología</li>
                  <li>Escuchar y responder a las necesidades de nuestra comunidad</li>
                  <li>Innovar constantemente en nuestros formatos y enfoques educativos</li>
                  <li>Operar con integridad financiera y transparencia total</li>
                </ul>

                <h2>Nuestro Impacto</h2>

                <p>
                  Desde nuestro inicio, hemos impactado la vida de miles de musulmanes 
                  hispanohablantes alrededor del mundo, proporcionando recursos que:
                </p>

                <ul>
                  <li>Fortalecen la fe y el conocimiento islámico</li>
                  <li>Responden preguntas difíciles con sabiduría y claridad</li>
                  <li>Conectan la tradición islámica con la vida moderna</li>
                  <li>Empoderan a las comunidades musulmanas</li>
                  <li>Desmitifican el Islam para el público general</li>
                </ul>

                <HighlightBox>
                  <h3>Únete a Nuestra Misión</h3>
                  <p>
                    Ya sea como estudiante, donante, voluntario o colaborador, tu participación 
                    es fundamental para hacer realidad nuestra visión. Juntos podemos hacer que 
                    el conocimiento islámico auténtico llegue a cada rincón del mundo hispanohablante.
                  </p>
                </HighlightBox>
              </>
            ) : (
              <>
                <p>
                  At <strong>La Última Medina</strong>, we believe that authentic Islamic knowledge 
                  should be accessible to everyone, regardless of their location, language, or 
                  prior level of knowledge.
                </p>

                <HighlightBox>
                  <h3>Our Vision</h3>
                  <p>
                    To be the leading Spanish-language source for rigorous Islamic knowledge, 
                    inspiring a generation of informed, committed Muslims capable of contributing 
                    positively to their communities.
                  </p>
                </HighlightBox>

                <h2>Our Core Values</h2>

                <h3>🎯 Academic Rigor</h3>
                <p>
                  All our content is based on authentic Islamic sources: the Quran, the Sunnah 
                  of Prophet Muhammad ﷺ, and the consensus of recognized scholars. We collaborate 
                  with qualified academics to ensure the accuracy and authenticity of every article, 
                  video, and podcast.
                </p>

                <h3>🌍 Universal Accessibility</h3>
                <p>
                  We believe Islamic knowledge should not be limited by linguistic, economic, or 
                  geographic barriers. That's why we offer all our content free of charge, in 
                  multiple languages, and optimized for any device.
                </p>

                <h3>💡 Contemporary Relevance</h3>
                <p>
                  We address the questions and challenges Muslims face in today's world, from 
                  ethics in technology to social justice, always grounded in the timeless 
                  teachings of Islam.
                </p>

                <h3>🤝 Community and Dialogue</h3>
                <p>
                  We foster a respectful learning space where questions are welcome and 
                  constructive dialogue is valued. We believe in the transformative power 
                  of informed conversation.
                </p>

                <Quote>
                  "Seeking knowledge is an obligation upon every Muslim."
                  <br />
                  <small style={{ fontSize: '1rem', opacity: 0.8 }}>— Hadith of Prophet Muhammad ﷺ</small>
                </Quote>

                <h2>Our Commitment</h2>

                <p>We commit to:</p>

                <ul>
                  <li>Produce content of the highest academic quality</li>
                  <li>Maintain our editorial independence</li>
                  <li>Be transparent about our sources and methodology</li>
                  <li>Listen and respond to our community's needs</li>
                  <li>Constantly innovate in our educational formats and approaches</li>
                  <li>Operate with financial integrity and complete transparency</li>
                </ul>

                <h2>Our Impact</h2>

                <p>
                  Since our inception, we have impacted the lives of thousands of Spanish-speaking 
                  Muslims worldwide, providing resources that:
                </p>

                <ul>
                  <li>Strengthen faith and Islamic knowledge</li>
                  <li>Answer difficult questions with wisdom and clarity</li>
                  <li>Connect Islamic tradition with modern life</li>
                  <li>Empower Muslim communities</li>
                  <li>Demystify Islam for the general public</li>
                </ul>

                <HighlightBox>
                  <h3>Join Our Mission</h3>
                  <p>
                    Whether as a student, donor, volunteer, or contributor, your participation 
                    is fundamental to making our vision a reality. Together we can bring authentic 
                    Islamic knowledge to every corner of the Spanish-speaking world.
                  </p>
                </HighlightBox>
              </>
            )}
          </Content>
        </motion.div>
      </Container>
    </MainLayout>
  );
}

