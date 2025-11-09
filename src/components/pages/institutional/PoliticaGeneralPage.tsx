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

const LastUpdated = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['3xl']};
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.brand.dark};
    margin: ${({ theme }) => theme.spacing['2xl']} 0 ${({ theme }) => theme.spacing.lg};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  ul {
    margin: ${({ theme }) => theme.spacing.lg} 0;
    padding-left: ${({ theme }) => theme.spacing.xl};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

export default function PoliticaGeneralPage() {
  const locale = useLocale();

  return (
    <MainLayout>
      <Container>
        <Title>
          {locale === 'es' ? 'Política General' : locale === 'ar' ? 'السياسة العامة' : 'General Policy'}
        </Title>
        <LastUpdated>
          {locale === 'es' ? 'Última actualización' : locale === 'ar' ? 'آخر تحديث' : 'Last updated'}: 30 {locale === 'es' ? 'de octubre de' : locale === 'ar' ? 'أكتوبر' : 'October'} 2024
        </LastUpdated>

        <Content>
          {locale === 'es' ? (
            <>
              <h2>1. Términos de Uso</h2>
              <p>
                Bienvenido a La Última Medina. Al acceder y utilizar este sitio web, aceptas cumplir 
                con estos términos y condiciones de uso.
              </p>

              <h2>2. Propiedad Intelectual</h2>
              <p>
                Todo el contenido publicado en este sitio web, incluyendo artículos, vídeos, podcasts, 
                infografías y cualquier otro material, es propiedad de La Última Medina o de sus 
                respectivos creadores y está protegido por las leyes de propiedad intelectual.
              </p>

              <h2>3. Uso del Contenido</h2>
              <p>
                Puedes:
              </p>
              <ul>
                <li>Ver y leer el contenido para uso personal</li>
                <li>Compartir enlaces en redes sociales</li>
                <li>Citar fragmentos con atribución adecuada</li>
              </ul>
              <p>
                No puedes:
              </p>
              <ul>
                <li>Reproducir contenido sin autorización</li>
                <li>Usar el contenido con fines comerciales sin permiso</li>
                <li>Modificar o alterar el contenido</li>
              </ul>

              <h2>4. Comentarios y Participación</h2>
              <p>
                Al participar en nuestra comunidad (El Zoco), te comprometes a:
              </p>
              <ul>
                <li>Mantener un tono respetuoso</li>
                <li>No publicar contenido ofensivo o inapropiado</li>
                <li>Respetar las opiniones de otros miembros</li>
                <li>No hacer spam o publicidad no solicitada</li>
              </ul>

              <h2>5. Donaciones</h2>
              <p>
                Las donaciones a La Última Medina son voluntarias y no reembolsables. Todos los 
                fondos se utilizan para mantener y mejorar nuestros servicios educativos.
              </p>

              <h2>6. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los 
                cambios serán efectivos inmediatamente después de su publicación en esta página.
              </p>

              <h2>7. Contacto</h2>
              <p>
                Para preguntas sobre estos términos, contáctanos en: laultimamedina@gmail.com
              </p>
            </>
          ) : (
            <>
              <h2>1. Terms of Use</h2>
              <p>
                Welcome to La Última Medina. By accessing and using this website, you agree to comply 
                with these terms and conditions of use.
              </p>
              {/* Inglés simplificado */}
            </>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
}

