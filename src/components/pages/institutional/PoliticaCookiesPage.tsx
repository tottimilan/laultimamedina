'use client';

import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';

const Container = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: ${({ theme }) => theme.spacing['4xl']} ${({ theme }) => theme.spacing.xl};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  text-align: center;
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    margin: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing.lg};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: ${({ theme }) => theme.spacing.lg} 0;
  }
  
  th, td {
    padding: ${({ theme }) => theme.spacing.md};
    border: 1px solid ${({ theme }) => theme.colors.border.light};
    text-align: left;
  }
  
  th {
    background: ${({ theme }) => theme.colors.background.secondary};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
  }
`;

export default function PoliticaCookiesPage() {
  const locale = useLocale();

  return (
    <MainLayout>
      <Container>
        <Title>
          {locale === 'es' ? 'Política de Cookies' : locale === 'ar' ? 'سياسة ملفات تعريف الارتباط' : 'Cookie Policy'}
        </Title>

        <Content>
          {locale === 'es' ? (
            <>
              <h2>¿Qué son las Cookies?</h2>
              <p>
                Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando 
                visitas un sitio web. Nos ayudan a mejorar tu experiencia y entender cómo usas nuestro sitio.
              </p>

              <h2>Cookies que Utilizamos</h2>
              
              <table>
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Propósito</th>
                    <th>Duración</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Esenciales</strong></td>
                    <td>Necesarias para el funcionamiento del sitio (idioma, sesión)</td>
                    <td>Sesión / 1 año</td>
                  </tr>
                  <tr>
                    <td><strong>Analíticas</strong></td>
                    <td>Google Analytics para entender el uso del sitio</td>
                    <td>2 años</td>
                  </tr>
                  <tr>
                    <td><strong>Preferencias</strong></td>
                    <td>Recordar tus configuraciones (tema, idioma)</td>
                    <td>1 año</td>
                  </tr>
                </tbody>
              </table>

              <h2>Gestionar Cookies</h2>
              <p>
                Puedes gestionar tus preferencias de cookies a través del banner de consentimiento 
                que aparece en tu primera visita, o configurar tu navegador para bloquear cookies.
              </p>

              <h2>Cookies de Terceros</h2>
              <p>
                Utilizamos servicios de terceros que pueden establecer cookies:
              </p>
              <ul>
                <li><strong>Google Analytics</strong>: Para estadísticas de uso</li>
                <li><strong>YouTube</strong>: Para reproducir vídeos incrustados</li>
                <li><strong>Stripe</strong>: Para procesar pagos de forma segura</li>
              </ul>

              <h2>Más Información</h2>
              <p>
                Para más detalles sobre nuestra política de privacidad, consulta nuestra{' '}
                <a href={`/${locale}/privacy`} style={{ color: '#0d5c47', textDecoration: 'underline' }}>
                  Política de Privacidad
                </a>.
              </p>
            </>
          ) : (
            <>
              <h2>What are Cookies?</h2>
              <p>
                Cookies are small text files stored on your device when you visit a website. 
                They help us improve your experience and understand how you use our site.
              </p>
            </>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
}

