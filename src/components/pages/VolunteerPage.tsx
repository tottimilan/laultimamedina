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

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['4xl']};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const Content = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  
  h2 {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.brand.dark};
    margin: ${({ theme }) => theme.spacing['3xl']} 0 ${({ theme }) => theme.spacing.lg};
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
    list-style: disc;
    padding-left: ${({ theme }) => theme.spacing.xl};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
  }
  
  li {
    margin-bottom: ${({ theme }) => theme.spacing.sm};
  }
`;

const CTAButton = styled.a`
  display: inline-block;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing['2xl']};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border-radius: ${({ theme }) => theme.radii.md};
  text-decoration: none;
  transition: all ${({ theme }) => theme.transitions.base};
  margin-top: ${({ theme }) => theme.spacing.xl};
  
  &:hover {
    background: ${({ theme }) => theme.colors.brand.accent};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.lg};
  }
`;

const CTASection = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing['4xl']};
  padding: ${({ theme }) => theme.spacing['3xl']};
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.radii.lg};
`;

export default function VolunteerPage() {
  const locale = useLocale();

  return (
    <MainLayout>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>
            {locale === 'es' ? '¿Quieres ser medinero o medinera?' : locale === 'ar' ? 'هل تريد أن تكون مدينيًا؟' : 'Want to be a medinero or medinera?'}
          </Title>
          <Subtitle>
            {locale === 'es'
              ? 'En La Última Medina creemos que la comunidad se construye entre todos. Si quieres aportar tu tiempo, tus ideas o tus habilidades, este es tu lugar. Ser medinero o medinera es formar parte de un proyecto vivo.'
              : locale === 'ar'
              ? 'في المدينة الأخيرة نؤمن بأن المجتمع يبنى معًا. إذا كنت تريد المساهمة بوقتك وأفكارك ومهاراتك، هذا هو مكانك.'
              : 'At La Última Medina we believe community is built together. If you want to contribute your time, ideas or skills, this is your place. Being a medinero or medinera means being part of a living project.'}
          </Subtitle>

          <Content>
            {locale === 'es' ? (
              <>
                <h2>¿Por qué ser voluntario?</h2>
                <p>
                  En La Última Medina, valoramos profundamente la contribución de nuestros voluntarios. 
                  Tu dedicación nos ayuda a ofrecer educación islámica de calidad a miles de personas 
                  alrededor del mundo de forma gratuita.
                </p>

                <h2>Áreas de Voluntariado</h2>

                <h3>Traducción y Localización</h3>
                <p>
                  Ayúdanos a traducir artículos, vídeos y podcasts a diferentes idiomas. Especialmente 
                  buscamos voluntarios que dominen el español, inglés y árabe.
                </p>

                <h3>Revisión Editorial</h3>
                <p>
                  Si tienes conocimientos de Islam y habilidades de edición, puedes ayudarnos a revisar 
                  contenido antes de su publicación.
                </p>

                <h3>Diseño Gráfico</h3>
                <p>
                  Crea infografías, imágenes para redes sociales y material visual para nuestro contenido.
                </p>

                <h3>Gestión de Redes Sociales</h3>
                <p>
                  Ayuda a compartir nuestro contenido en plataformas sociales y engage con nuestra comunidad.
                </p>

                <h3>Transcripción</h3>
                <p>
                  Transcribe vídeos y podcasts para hacerlos más accesibles a personas con discapacidades 
                  auditivas y para mejorar el SEO.
                </p>

                <h2>¿Qué Ofrecemos?</h2>
                <ul>
                  <li>Oportunidad de contribuir a una causa significativa</li>
                  <li>Flexibilidad horaria (trabaja cuando puedas)</li>
                  <li>Capacitación y mentoría</li>
                  <li>Certificados de voluntariado</li>
                  <li>Comunidad de personas comprometidas</li>
                  <li>Desarrollo de habilidades profesionales</li>
                </ul>
              </>
            ) : locale === 'ar' ? (
              <>
                <h2>لماذا تتطوع؟</h2>
                <p>
                  في المدينة الأخيرة، نقدر بعمق مساهمة متطوعينا. تفانيك يساعدنا على تقديم 
                  التعليم الإسلامي عالي الجودة لآلاف الأشخاص حول العالم مجانًا.
                </p>

                <h2>مجالات التطوع</h2>

                <h3>الترجمة والتوطين</h3>
                <p>
                  ساعدنا في ترجمة المقالات والفيديوهات والبودكاست إلى لغات مختلفة.
                </p>

                <h3>المراجعة التحريرية</h3>
                <p>
                  إذا كانت لديك معرفة بالإسلام ومهارات التحرير، يمكنك مساعدتنا في 
                  مراجعة المحتوى قبل نشره.
                </p>

                <h3>التصميم الجرافيكي</h3>
                <p>
                  أنشئ رسومات معلوماتية وصور لوسائل التواصل الاجتماعي ومواد بصرية لمحتوانا.
                </p>
              </>
            ) : (
              <>
                <h2>Why Volunteer?</h2>
                <p>
                  At La Última Medina, we deeply value the contribution of our volunteers. Your dedication 
                  helps us provide quality Islamic education to thousands of people worldwide for free.
                </p>

                <h2>Volunteer Areas</h2>

                <h3>Translation and Localization</h3>
                <p>
                  Help us translate articles, videos, and podcasts into different languages. We especially 
                  seek volunteers fluent in Spanish, English, and Arabic.
                </p>

                <h3>Editorial Review</h3>
                <p>
                  If you have Islamic knowledge and editing skills, you can help us review content before 
                  publication.
                </p>

                <h3>Graphic Design</h3>
                <p>
                  Create infographics, social media images, and visual materials for our content.
                </p>

                <h3>Social Media Management</h3>
                <p>
                  Help share our content on social platforms and engage with our community.
                </p>

                <h3>Transcription</h3>
                <p>
                  Transcribe videos and podcasts to make them more accessible and improve SEO.
                </p>

                <h2>What We Offer</h2>
                <ul>
                  <li>Opportunity to contribute to a meaningful cause</li>
                  <li>Flexible hours (work when you can)</li>
                  <li>Training and mentorship</li>
                  <li>Volunteer certificates</li>
                  <li>Community of committed people</li>
                  <li>Professional skills development</li>
                </ul>
              </>
            )}
          </Content>

          <CTASection>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              {locale === 'es' ? '¿Listo para empezar?' : locale === 'ar' ? 'هل أنت مستعد للبدء؟' : 'Ready to Start?'}
            </h2>
            <p style={{ fontSize: '1.125rem', color: '#4a5568', marginBottom: '2rem' }}>
              {locale === 'es'
                ? 'Contáctanos para conocer más sobre cómo puedes contribuir'
                : locale === 'ar'
                ? 'اتصل بنا لمعرفة المزيد حول كيفية المساهمة'
                : 'Contact us to learn more about how you can contribute'}
            </p>
            <CTAButton href={`/${locale}/contact`}>
              {locale === 'es' ? 'Contactar' : locale === 'ar' ? 'اتصل بنا' : 'Contact Us'}
            </CTAButton>
          </CTASection>
        </motion.div>
      </Container>
    </MainLayout>
  );
}

