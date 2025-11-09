'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.background.secondary};
`;

const Card = styled.div`
  background: white;
  padding: ${({ theme }) => theme.spacing['3xl']};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.shadows.xl};
  width: 100%;
  max-width: 450px;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
  
  img {
    height: 60px;
    width: auto;
  }
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.brand.dark};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-align: center;
`;

const Subtitle = styled.p`
  text-align: center;
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing['2xl']};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const Label = styled.label`
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: ${({ theme }) => theme.fontSizes.base};
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.brand.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.brand.primary}20;
  }
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.xl};
  background: ${({ theme }) => theme.colors.brand.primary};
  color: white;
  font-size: ${({ theme }) => theme.fontSizes.base};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.base};
  
  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.brand.accent};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.status.error}20;
  border: 1px solid ${({ theme }) => theme.colors.status.error};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.status.error};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const Divider = styled.div`
  text-align: center;
  margin: ${({ theme }) => theme.spacing.lg} 0;
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const RegisterLink = styled.div`
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  
  a {
    color: ${({ theme }) => theme.colors.brand.primary};
    text-decoration: none;
    font-weight: ${({ theme }) => theme.fontWeights.semibold};
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function LoginPage() {
  const locale = useLocale();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(locale === 'es' ? 'Email o contraseña incorrectos' : locale === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'Invalid email or password');
      } else {
        router.push(`/${locale}/dashboard`);
        router.refresh();
      }
    } catch (error) {
      setError(locale === 'es' ? 'Error al iniciar sesión' : locale === 'ar' ? 'خطأ في تسجيل الدخول' : 'Error signing in');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Card>
        <Logo>
          <img src="/logo.webp" alt="La Última Medina" />
        </Logo>
        
        <Title>
          {locale === 'es' ? 'Iniciar Sesión' : locale === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
        </Title>
        <Subtitle>
          {locale === 'es' ? 'Accede a tu cuenta de miembro' : locale === 'ar' ? 'الوصول إلى حساب عضوك' : 'Access your member account'}
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <FormGroup>
            <Label htmlFor="email">
              {locale === 'es' ? 'Email' : locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="password">
              {locale === 'es' ? 'Contraseña' : locale === 'ar' ? 'كلمة المرور' : 'Password'}
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading}>
            {isLoading 
              ? (locale === 'es' ? 'Iniciando...' : locale === 'ar' ? 'جاري تسجيل الدخول...' : 'Signing in...') 
              : (locale === 'es' ? 'Iniciar Sesión' : locale === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
          </Button>
        </Form>

        <Divider>
          {locale === 'es' ? '¿No tienes cuenta?' : locale === 'ar' ? 'ليس لديك حساب؟' : 'Don\'t have an account?'}
        </Divider>

        <RegisterLink>
          <Link href={`/${locale}/register`}>
            {locale === 'es' ? 'Regístrate aquí' : locale === 'ar' ? 'سجل هنا' : 'Register here'}
          </Link>
        </RegisterLink>
      </Card>
    </Container>
  );
}

