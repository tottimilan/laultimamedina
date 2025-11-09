import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors - La Última Medina
        brand: {
          primary: '#0d5c47', // Verde oscuro profesional
          secondary: '#b8956a', // Beige/dorado discreto
          accent: '#1a7f64', // Verde medio
          dark: '#0a2e23', // Verde muy oscuro
          light: '#f7f9f8', // Blanco verdoso sutil
        },
        text: {
          primary: '#2d3748',
          secondary: '#718096',
          inverse: '#ffffff',
        },
      },
      fontFamily: {
        // Se configurarán con Google Fonts según identidad
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        arabic: ['var(--font-arabic)', 'Arial', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: theme('colors.text.primary'),
            a: {
              color: theme('colors.brand.primary'),
              '&:hover': {
                color: theme('colors.brand.secondary'),
              },
            },
            h1: {
              color: theme('colors.brand.dark'),
            },
            h2: {
              color: theme('colors.brand.dark'),
            },
            h3: {
              color: theme('colors.brand.dark'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;

