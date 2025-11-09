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
  
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.xl};
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    color: ${({ theme }) => theme.colors.brand.primary};
    margin: ${({ theme }) => theme.spacing.xl} 0 ${({ theme }) => theme.spacing.md};
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
  
  strong {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.brand.dark};
  }
`;

export default function PrivacyPage() {
  const locale = useLocale();

  return (
    <MainLayout>
      <Container>
        <Title>
          {locale === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
        </Title>
        <LastUpdated>
          {locale === 'es' ? 'Última actualización' : 'Last updated'}: 30 {locale === 'es' ? 'de octubre de' : 'October'} 2024
        </LastUpdated>

        <Content>
          {locale === 'es' ? (
            <>
              <h2>1. Introducción</h2>
              <p>
                En La Última Medina, nos tomamos muy en serio tu privacidad. Esta política 
                describe cómo recopilamos, usamos y protegemos tu información personal cuando 
                utilizas nuestro sitio web.
              </p>

              <h2>2. Información que Recopilamos</h2>
              
              <h3>2.1 Información que nos proporcionas</h3>
              <ul>
                <li><strong>Formulario de contacto</strong>: Nombre, email, asunto y mensaje</li>
                <li><strong>Donaciones</strong>: Información procesada por Stripe (no almacenamos datos de tarjetas)</li>
                <li><strong>Newsletter</strong>: Email y preferencias de idioma</li>
              </ul>

              <h3>2.2 Información recopilada automáticamente</h3>
              <ul>
                <li>Dirección IP (anonimizada)</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas y tiempo de permanencia</li>
                <li>Idioma preferido</li>
              </ul>

              <h2>3. Cómo Usamos tu Información</h2>
              <p>Utilizamos tu información para:</p>
              <ul>
                <li>Responder a tus consultas y solicitudes</li>
                <li>Procesar donaciones de forma segura</li>
                <li>Enviar newsletters (solo si te has suscrito)</li>
                <li>Mejorar nuestro sitio web y servicios</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>

              <h2>4. Cookies y Tecnologías Similares</h2>
              <p>
                Utilizamos cookies para mejorar tu experiencia de navegación. Puedes gestionar 
                tus preferencias de cookies en cualquier momento a través de nuestro banner de 
                consentimiento.
              </p>

              <h3>Tipos de cookies que usamos:</h3>
              <ul>
                <li><strong>Esenciales</strong>: Necesarias para el funcionamiento del sitio</li>
                <li><strong>Analíticas</strong>: Para entender cómo usas el sitio (Google Analytics)</li>
                <li><strong>Preferencias</strong>: Para recordar tu idioma y configuración</li>
              </ul>

              <h2>5. Compartir tu Información</h2>
              <p>
                <strong>No vendemos ni alquilamos tu información personal.</strong> Solo compartimos 
                datos con:
              </p>
              <ul>
                <li><strong>Stripe</strong>: Para procesar pagos de forma segura</li>
                <li><strong>Proveedores de email</strong>: Para enviar newsletters (con tu consentimiento)</li>
                <li><strong>Herramientas analíticas</strong>: Google Analytics (datos anonimizados)</li>
              </ul>

              <h2>6. Seguridad de tus Datos</h2>
              <p>
                Implementamos medidas de seguridad técnicas y organizativas para proteger tu 
                información personal contra acceso no autorizado, alteración, divulgación o 
                destrucción.
              </p>

              <h2>7. Tus Derechos</h2>
              <p>Bajo el RGPD y otras leyes de privacidad, tienes derecho a:</p>
              <ul>
                <li><strong>Acceder</strong> a tu información personal</li>
                <li><strong>Rectificar</strong> datos inexactos</li>
                <li><strong>Eliminar</strong> tu información ("derecho al olvido")</li>
                <li><strong>Limitar</strong> el procesamiento de tus datos</li>
                <li><strong>Portabilidad</strong> de tus datos</li>
                <li><strong>Oponerte</strong> al procesamiento de tus datos</li>
                <li><strong>Retirar consentimiento</strong> en cualquier momento</li>
              </ul>
              <p>
                Para ejercer cualquiera de estos derechos, contáctanos en: privacy@laultimamedina.org
              </p>

              <h2>8. Retención de Datos</h2>
              <p>
                Conservamos tu información personal solo durante el tiempo necesario para cumplir 
                los propósitos descritos en esta política, a menos que la ley requiera un período 
                de retención más largo.
              </p>

              <h2>9. Transferencias Internacionales</h2>
              <p>
                Algunos de nuestros proveedores de servicios pueden estar ubicados fuera del 
                Espacio Económico Europeo. Nos aseguramos de que estas transferencias cumplan 
                con las leyes de protección de datos aplicables.
              </p>

              <h2>10. Menores de Edad</h2>
              <p>
                Nuestro sitio no está dirigido a menores de 13 años. No recopilamos 
                intencionadamente información personal de menores sin el consentimiento parental.
              </p>

              <h2>11. Cambios a esta Política</h2>
              <p>
                Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos 
                sobre cambios significativos publicando la nueva política en esta página con una 
                fecha de "última actualización" revisada.
              </p>

              <h2>12. Contacto</h2>
              <p>
                Si tienes preguntas sobre esta política de privacidad, contáctanos:
              </p>
              <ul>
                <li>Email: privacy@laultimamedina.org</li>
                <li>Formulario de contacto: /es/contact</li>
              </ul>
            </>
          ) : (
            <>
              <h2>1. Introduction</h2>
              <p>
                At La Última Medina, we take your privacy very seriously. This policy describes 
                how we collect, use, and protect your personal information when you use our website.
              </p>

              <h2>2. Information We Collect</h2>
              
              <h3>2.1 Information you provide</h3>
              <ul>
                <li><strong>Contact form</strong>: Name, email, subject, and message</li>
                <li><strong>Donations</strong>: Information processed by Stripe (we don't store card data)</li>
                <li><strong>Newsletter</strong>: Email and language preferences</li>
              </ul>

              <h3>2.2 Automatically collected information</h3>
              <ul>
                <li>IP address (anonymized)</li>
                <li>Browser type and device</li>
                <li>Pages visited and time spent</li>
                <li>Preferred language</li>
              </ul>

              <h2>3. How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Respond to your inquiries and requests</li>
                <li>Process donations securely</li>
                <li>Send newsletters (only if you've subscribed)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2>4. Cookies and Similar Technologies</h2>
              <p>
                We use cookies to improve your browsing experience. You can manage your cookie 
                preferences at any time through our consent banner.
              </p>

              <h3>Types of cookies we use:</h3>
              <ul>
                <li><strong>Essential</strong>: Necessary for site functionality</li>
                <li><strong>Analytics</strong>: To understand how you use the site (Google Analytics)</li>
                <li><strong>Preferences</strong>: To remember your language and settings</li>
              </ul>

              <h2>5. Sharing Your Information</h2>
              <p>
                <strong>We do not sell or rent your personal information.</strong> We only share 
                data with:
              </p>
              <ul>
                <li><strong>Stripe</strong>: To process payments securely</li>
                <li><strong>Email providers</strong>: To send newsletters (with your consent)</li>
                <li><strong>Analytics tools</strong>: Google Analytics (anonymized data)</li>
              </ul>

              <h2>6. Data Security</h2>
              <p>
                We implement technical and organizational security measures to protect your 
                personal information against unauthorized access, alteration, disclosure, or 
                destruction.
              </p>

              <h2>7. Your Rights</h2>
              <p>Under GDPR and other privacy laws, you have the right to:</p>
              <ul>
                <li><strong>Access</strong> your personal information</li>
                <li><strong>Rectify</strong> inaccurate data</li>
                <li><strong>Delete</strong> your information ("right to be forgotten")</li>
                <li><strong>Limit</strong> processing of your data</li>
                <li><strong>Data portability</strong></li>
                <li><strong>Object</strong> to data processing</li>
                <li><strong>Withdraw consent</strong> at any time</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at: privacy@laultimamedina.org
              </p>

              <h2>8. Data Retention</h2>
              <p>
                We retain your personal information only as long as necessary to fulfill the 
                purposes described in this policy, unless a longer retention period is required 
                by law.
              </p>

              <h2>9. International Transfers</h2>
              <p>
                Some of our service providers may be located outside the European Economic Area. 
                We ensure these transfers comply with applicable data protection laws.
              </p>

              <h2>10. Minors</h2>
              <p>
                Our site is not directed to children under 13. We do not knowingly collect 
                personal information from minors without parental consent.
              </p>

              <h2>11. Changes to this Policy</h2>
              <p>
                We may update this privacy policy occasionally. We will notify you of significant 
                changes by posting the new policy on this page with a revised "last updated" date.
              </p>

              <h2>12. Contact</h2>
              <p>
                If you have questions about this privacy policy, contact us:
              </p>
              <ul>
                <li>Email: privacy@laultimamedina.org</li>
                <li>Contact form: /en/contact</li>
              </ul>
            </>
          )}
        </Content>
      </Container>
    </MainLayout>
  );
}

