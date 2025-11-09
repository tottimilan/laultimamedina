'use client';

import { SessionProvider } from 'next-auth/react';

/**
 * Provider de NextAuth para el cliente
 */
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

