'use client';

import { ThemeProvider } from 'styled-components';
import StyledComponentsRegistry from '@/lib/registry';
import AuthProvider from './AuthProvider';
import { theme } from '@/styles/theme';

/**
 * Proveedores que solo pueden ejecutarse en el cliente
 * Incluye ThemeProvider de styled-components y el registry
 */
export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ThemeProvider>
    </StyledComponentsRegistry>
  );
}

