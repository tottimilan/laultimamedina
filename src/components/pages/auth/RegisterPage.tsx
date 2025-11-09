'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import styled from 'styled-components';

// Usar los mismos estilos del Login
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

const SuccessMessage = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.status.success}20;
  border: 1px solid ${({ theme }) => theme.colors.status.success};
  border-radius: ${({ theme }) => theme.radii.sm};
  color: ${({ theme }) => theme.colors.status.success};
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

const LoginLink = styled.div`
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

export default function RegisterPage() {
  const locale = useLocale();
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError(locale === 'es' ? 'Las contraseñas no coinciden' : locale === 'ar' ? 'كلمات المرور لا تتطابق' : 'Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError(locale === 'es' ? 'La contraseña debe tener al menos 8 caracteres' : locale === 'ar' ? 'يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل' : 'Password must be at least 8 characters');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          locale,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || (locale === 'es' ? 'Error al registrarse' : locale === 'ar' ? 'خطأ في التسجيل' : 'Error registering'));
      } else {
        setSuccess(true);
        
        // Auto-login después del registro
        setTimeout(async () => {
          await signIn('credentials', {
            email: formData.email,
            password: formData.password,
            redirect: false,
          });
          router.push(`/${locale}/dashboard`);
        }, 1500);
      }
    } catch (error) {
      setError(locale === 'es' ? 'Error al registrarse' : locale === 'ar' ? 'خطأ في التسجيل' : 'Error registering');
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
          {locale === 'es' ? 'Crear Cuenta' : locale === 'ar' ? 'إنشاء حساب' : 'Create Account'}
        </Title>
        <Subtitle>
          {locale === 'es' ? 'Únete a la comunidad de La Última Medina' : locale === 'ar' ? 'انضم إلى مجتمع المدينة الأخيرة' : 'Join La Última Medina community'}
        </Subtitle>

        <Form onSubmit={handleSubmit}>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && (
            <SuccessMessage>
              {locale === 'es' ? '¡Cuenta creada! Redirigiendo...' : locale === 'ar' ? 'تم إنشاء الحساب! جاري التحويل...' : 'Account created! Redirecting...'}
            </SuccessMessage>
          )}
          
          <FormGroup>
            <Label htmlFor="name">
              {locale === 'es' ? 'Nombre' : locale === 'ar' ? 'الاسم' : 'Name'}
            </Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              disabled={isLoading}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">
              {locale === 'es' ? 'Email' : locale === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={isLoading}
              minLength={8}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="confirmPassword">
              {locale === 'es' ? 'Confirmar Contraseña' : locale === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
            </Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
              disabled={isLoading}
            />
          </FormGroup>

          <Button type="submit" disabled={isLoading || success}>
            {isLoading 
              ? (locale === 'es' ? 'Creando cuenta...' : locale === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...') 
              : (locale === 'es' ? 'Registrarse' : locale === 'ar' ? 'تسجيل' : 'Register')}
          </Button>
        </Form>

        <LoginLink>
          <Link href={`/${locale}/login`}>
            {locale === 'es' ? '¿Ya tienes cuenta? Inicia sesión' : locale === 'ar' ? 'هل لديك حساب؟ تسجيل الدخول' : 'Already have an account? Sign in'}
          </Link>
        </LoginLink>
      </Card>
    </Container>
  );
}

