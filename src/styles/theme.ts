import { DefaultTheme } from 'styled-components';

/**
 * Sistema de tokens de marca para La Última Medina
 * Exportado como tema de styled-components y variables CSS
 */

export const theme: DefaultTheme = {
  colors: {
    brand: {
      primary: '#0d5c47', // Verde oscuro profesional (tipo Yaqeen)
      secondary: '#b8956a', // Beige/dorado discreto
      accent: '#1a7f64', // Verde medio
      dark: '#0a2e23', // Verde muy oscuro casi negro
      light: '#f7f9f8', // Blanco verdoso muy sutil
    },
    text: {
      primary: '#1a202c', // Casi negro
      secondary: '#4a5568', // Gris oscuro
      inverse: '#ffffff',
      muted: '#718096',
    },
    background: {
      primary: '#ffffff',
      secondary: '#f8faf9', // Gris verdoso muy claro
      tertiary: '#eef1f0',
    },
    border: {
      light: '#e5e8e7',
      medium: '#cbd2d0',
      dark: '#9ca5a2',
    },
    status: {
      success: '#38a169',
      warning: '#dd6b20',
      error: '#e53e3e',
      info: '#3182ce',
    },
  },
  
  fonts: {
    sans: 'var(--font-sans)',
    serif: 'var(--font-serif)',
    arabic: 'var(--font-arabic)',
  },
  
  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
  },
  
  fontWeights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },
  
  spacing: {
    xs: '0.25rem',    // 4px
    sm: '0.5rem',     // 8px
    md: '1rem',       // 16px
    lg: '1.5rem',     // 24px
    xl: '2rem',       // 32px
    '2xl': '3rem',    // 48px
    '3xl': '4rem',    // 64px
    '4xl': '6rem',    // 96px
    '5xl': '8rem',    // 128px
  },
  
  radii: {
    none: '0',
    sm: '0.125rem',    // 2px - Más sutil
    md: '0.25rem',     // 4px - Menos circular
    lg: '0.375rem',    // 6px - Profesional
    xl: '0.5rem',      // 8px - Reducido
    '2xl': '0.75rem',  // 12px - Más discreto
    full: '9999px',    // Solo para elementos circulares específicos
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -1px rgb(0 0 0 / 0.06)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.06)',
    none: 'none',
  },
  
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    base: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
  
  zIndices: {
    hide: -1,
    base: 0,
    dropdown: 1000,
    sticky: 1100,
    fixed: 1200,
    modalBackdrop: 1300,
    modal: 1400,
    overlay: 1500,
    popover: 1500,
    toast: 1600,
  },
};

// Tipos para TypeScript
type ThemeColors = {
  brand: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    light: string;
  };
  text: {
    primary: string;
    secondary: string;
    inverse: string;
    muted: string;
  };
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  border: {
    light: string;
    medium: string;
    dark: string;
  };
  status: {
    success: string;
    warning: string;
    error: string;
    info: string;
  };
};

type ThemeFonts = {
  sans: string;
  serif: string;
  arabic: string;
};

type ThemeFontSizes = {
  xs: string;
  sm: string;
  base: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
};

type ThemeFontWeights = {
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
};

type ThemeLineHeights = {
  tight: number;
  normal: number;
  relaxed: number;
  loose: number;
};

type ThemeSpacing = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
};

type ThemeRadii = {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  full: string;
};

type ThemeShadows = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
};

type ThemeTransitions = {
  fast: string;
  base: string;
  slow: string;
};

type ThemeBreakpoints = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
};

type ThemeZIndices = {
  hide: number;
  base: number;
  dropdown: number;
  sticky: number;
  fixed: number;
  modalBackdrop: number;
  modal: number;
  popover: number;
  toast: number;
  overlay: number;
};

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: ThemeColors;
    fonts: ThemeFonts;
    fontSizes: ThemeFontSizes;
    fontWeights: ThemeFontWeights;
    lineHeights: ThemeLineHeights;
    spacing: ThemeSpacing;
    radii: ThemeRadii;
    shadows: ThemeShadows;
    transitions: ThemeTransitions;
    breakpoints: ThemeBreakpoints;
    zIndices: ThemeZIndices;
  }
}

