import type { Metadata } from 'next';
import './globals.css';

/**
 * Root layout
 * Solo maneja estilos globales y redirección a locale
 */

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

