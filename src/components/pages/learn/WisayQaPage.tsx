'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import styled from 'styled-components';
import MainLayout from '@/components/MainLayout';
import { motion, AnimatePresence } from 'framer-motion';

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
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
`;

const SearchBox = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primary}20;
  }
`;

const QuestionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const QuestionCard = styled(motion.div)`
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
`;

const QuestionHeader = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.secondary};
  }
`;

const QuestionText = styled.h3`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.brand.dark};
`;

const ExpandIcon = styled.span<{ $isOpen: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.brand.primary};
  transition: transform ${({ theme }) => theme.transitions.base};
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
`;

const AnswerContent = styled(motion.div)`
  padding: 0 ${({ theme }) => theme.spacing.lg} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  padding-top: ${({ theme }) => theme.spacing.lg};
`;

export default function WisayQaPage() {
  const locale = useLocale();
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const questions = locale === 'es' ? [
    {
      id: '1',
      question: '¿Por qué Dios pide que lo adoremos?',
      answer: 'La adoración en el Islam no es para beneficio de Dios, sino para el beneficio del ser humano. A través de la adoración, el musulmán se conecta con su Creador, encuentra propósito, mantiene sus valores y desarrolla su carácter. Es una relación que eleva al ser humano, no que lo disminuye.',
    },
    {
      id: '2',
      question: '¿Por qué hay sufrimiento en el mundo si Dios es misericordioso?',
      answer: 'El sufrimiento es parte de la prueba de esta vida temporal. El Islam enseña que esta vida es una prueba, y el sufrimiento puede servir para expiar pecados, elevar rangos, o probar la paciencia y fe del creyente. La verdadera justicia y recompensa se encuentra en la vida eterna.',
    },
    {
      id: '3',
      question: '¿Es el Islam compatible con la ciencia moderna?',
      answer: 'El Islam promueve activamente la búsqueda del conocimiento. Históricamente, los musulmanes han sido pioneros en matemáticas, astronomía, medicina y otras ciencias. El Corán invita a la reflexión sobre la naturaleza y el universo. No hay conflicto inherente entre el Islam auténtico y la ciencia legítima.',
    },
  ] : locale === 'ar' ? [
    {
      id: '1',
      question: 'لماذا يطلب الله أن نعبده؟',
      answer: 'العبادة في الإسلام ليست لفائدة الله، بل لفائدة الإنسان. من خلال العبادة، يتصل المسلم بخالقه، ويجد هدفًا، ويحافظ على قيمه ويطور شخصيته.',
    },
    {
      id: '2',
      question: 'لماذا يوجد معاناة في العالم إذا كان الله رحيمًا؟',
      answer: 'المعاناة جزء من اختبار هذه الحياة المؤقتة. يعلم الإسلام أن هذه الحياة اختبار، والمعاناة يمكن أن تكفر الذنوب أو ترفع الدرجات أو تختبر الصبر والإيمان.',
    },
    {
      id: '3',
      question: 'هل الإسلام متوافق مع العلم الحديث؟',
      answer: 'يشجع الإسلام بنشاط على البحث عن المعرفة. تاريخيًا، كان المسلمون رواد في الرياضيات والفلك والطب وعلوم أخرى. القرآن يدعو إلى التأمل في الطبيعة والكون.',
    },
  ] : [
    {
      id: '1',
      question: 'Why does God ask us to worship Him?',
      answer: 'Worship in Islam is not for God\'s benefit, but for the benefit of the human being. Through worship, Muslims connect with their Creator, find purpose, maintain their values and develop their character. It is a relationship that elevates the human, not diminishes them.',
    },
    {
      id: '2',
      question: 'Why is there suffering in the world if God is merciful?',
      answer: 'Suffering is part of the test of this temporary life. Islam teaches that this life is a trial, and suffering can serve to expiate sins, elevate ranks, or test the patience and faith of the believer. True justice and reward is found in eternal life.',
    },
    {
      id: '3',
      question: 'Is Islam compatible with modern science?',
      answer: 'Islam actively promotes the pursuit of knowledge. Historically, Muslims have been pioneers in mathematics, astronomy, medicine and other sciences. The Quran invites reflection on nature and the universe. There is no inherent conflict between authentic Islam and legitimate science.',
    },
  ];

  const filteredQuestions = questions.filter(q =>
    q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MainLayout>
      <Container>
        <Header>
          <Title>
            {locale === 'es' ? 'Qué Dice el Islam' : locale === 'ar' ? 'ماذا يقول الإسلام' : 'What Islam Says'}
          </Title>
          <Subtitle>
            {locale === 'es'
              ? 'Respuestas rápidas y completas a preguntas comunes sobre el Islam. Un catálogo en constante crecimiento.'
              : locale === 'ar'
              ? 'إجابات سريعة وكاملة على الأسئلة الشائعة حول الإسلام. كتالوج في نمو مستمر.'
              : 'Quick and complete answers to common questions about Islam. An ever-growing catalogue.'}
          </Subtitle>
        </Header>

        <SearchBox
          type="search"
          placeholder={locale === 'es' ? 'Buscar pregunta...' : locale === 'ar' ? 'ابحث عن سؤال...' : 'Search question...'}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <QuestionsGrid>
          {filteredQuestions.map((q, index) => (
            <QuestionCard
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <QuestionHeader onClick={() => setOpenQuestion(openQuestion === q.id ? null : q.id)}>
                <QuestionText>{q.question}</QuestionText>
                <ExpandIcon $isOpen={openQuestion === q.id}>▼</ExpandIcon>
              </QuestionHeader>
              
              <AnimatePresence>
                {openQuestion === q.id && (
                  <AnswerContent
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {q.answer}
                  </AnswerContent>
                )}
              </AnimatePresence>
            </QuestionCard>
          ))}
        </QuestionsGrid>
      </Container>
    </MainLayout>
  );
}

