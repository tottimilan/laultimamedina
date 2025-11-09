'use client';

import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion } from 'framer-motion';

const Container = styled.div`
  max-width: 1000px;
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

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  max-width: 700px;
  margin: 0 auto;
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin: ${({ theme }) => theme.spacing['3xl']} 0 ${({ theme }) => theme.spacing.lg};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
`;

const CommunitySection = styled.div`
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  padding: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: center;
`;

export default function ElZocoPage() {
  const locale = useLocale();

  return (
    <MainLayout>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Header>
            <Title>
              {locale === 'es' ? 'El Zoco' : locale === 'ar' ? 'السوق' : 'The Souk'}
            </Title>
            <Subtitle>
              {locale === 'es'
                ? 'Un espacio de encuentro para la comunidad de La Última Medina'
                : locale === 'ar'
                ? 'مساحة للقاء مجتمع المدينة الأخيرة'
                : 'A meeting space for La Última Medina community'}
            </Subtitle>
          </Header>

          <Content>
            {locale === 'es' ? (
              <>
                <p>
                  El Zoco es nuestro espacio de comunidad. Como en los antiguos zocos de Al-Ándalus, 
                  este es un lugar de encuentro, intercambio de ideas y construcción colectiva.
                </p>

                <h2>¿Qué es El Zoco?</h2>
                <p>
                  Es más que un simple foro. Es un espacio donde los medineros y medineras pueden:
                </p>
                <ul style={{ paddingLeft: '2rem', marginBottom: '2rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Compartir reflexiones sobre contenido</li>
                  <li style={{ marginBottom: '0.5rem' }}>Hacer preguntas y debatir con respeto</li>
                  <li style={{ marginBottom: '0.5rem' }}>Conectar con otros estudiantes del Islam</li>
                  <li style={{ marginBottom: '0.5rem' }}>Proponer temas y contenidos</li>
                  <li style={{ marginBottom: '0.5rem' }}>Organizar eventos y encuentros</li>
                </ul>

                <h2>Únete a la Comunidad</h2>
                <p>
                  El Zoco está abierto para todos aquellos que buscan un espacio de diálogo respetuoso 
                  y aprendizaje continuo sobre el Islam, la historia y la filosofía.
                </p>
              </>
            ) : locale === 'ar' ? (
              <>
                <p>
                  السوق هو مساحة مجتمعنا. كما في أسواق الأندلس القديمة، هذا مكان للقاء 
                  وتبادل الأفكار والبناء الجماعي.
                </p>

                <h2>ما هو السوق؟</h2>
                <p>
                  إنه أكثر من مجرد منتدى. إنه مساحة حيث يمكن للأعضاء:
                </p>
              </>
            ) : (
              <>
                <p>
                  The Souk is our community space. Like the ancient souks of Al-Andalus, this is 
                  a place of encounter, exchange of ideas and collective construction.
                </p>

                <h2>What is The Souk?</h2>
                <p>
                  It's more than just a forum. It's a space where medineros and medineras can:
                </p>
                <ul style={{ paddingLeft: '2rem', marginBottom: '2rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>Share reflections on content</li>
                  <li style={{ marginBottom: '0.5rem' }}>Ask questions and debate with respect</li>
                  <li style={{ marginBottom: '0.5rem' }}>Connect with other Islam students</li>
                  <li style={{ marginBottom: '0.5rem' }}>Propose topics and content</li>
                  <li style={{ marginBottom: '0.5rem' }}>Organize events and meetings</li>
                </ul>
              </>
            )}
          </Content>

          <CommunitySection>
            <h2 style={{ marginBottom: '1rem', fontSize: '2rem' }}>
              {locale === 'es' ? 'Próximamente' : locale === 'ar' ? 'قريبًا' : 'Coming Soon'}
            </h2>
            <p style={{ color: '#4a5568', marginBottom: '2rem' }}>
              {locale === 'es'
                ? 'Estamos preparando este espacio de comunidad. Mantente atento a las novedades.'
                : locale === 'ar'
                ? 'نحن نحضر مساحة المجتمع هذه. ابق على اطلاع بالأخبار.'
                : 'We are preparing this community space. Stay tuned for updates.'}
            </p>
          </CommunitySection>
        </motion.div>
      </Container>
    </MainLayout>
  );
}

