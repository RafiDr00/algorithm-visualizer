// Theme constants and styled-components utilities
export const theme = {
  colors: {
    primary: {
      start: '#667eea',
      end: '#764ba2'
    },
    secondary: {
      start: '#f093fb',
      end: '#f5576c'
    },
    success: {
      start: '#4ade80',
      end: '#22c55e'
    },
    warning: {
      start: '#fbbf24',
      end: '#f59e0b'
    },
    danger: {
      start: '#ff6b6b',
      end: '#ee5a52'
    },
    info: {
      start: '#06b6d4',
      end: '#0891b2'
    },
    white: '#ffffff',
    dark: '#1a1a2e',
    gray: {
      100: 'rgba(255, 255, 255, 0.1)',
      200: 'rgba(255, 255, 255, 0.2)',
      300: 'rgba(255, 255, 255, 0.3)',
      400: 'rgba(255, 255, 255, 0.4)',
      500: 'rgba(255, 255, 255, 0.5)',
      600: 'rgba(255, 255, 255, 0.6)',
      700: 'rgba(255, 255, 255, 0.7)',
      800: 'rgba(255, 255, 255, 0.8)',
      900: 'rgba(255, 255, 255, 0.9)'
    }
  },
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    success: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
    warning: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
    danger: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%)',
    info: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
    glassmorphism: 'rgba(255, 255, 255, 0.1)'
  },
  shadows: {
    small: '0 4px 6px rgba(0, 0, 0, 0.1)',
    medium: '0 8px 25px rgba(0, 0, 0, 0.15)',
    large: '0 20px 40px rgba(0, 0, 0, 0.2)',
    glow: '0 0 20px rgba(102, 126, 234, 0.3)'
  },
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '15px',
    round: '50%'
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    xxl: '4rem'
  },
  typography: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem'
    },
    fontWeight: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    }
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px'
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease'
  },
  zIndex: {
    dropdown: 1000,
    modal: 1050,
    popover: 1060,
    tooltip: 1070
  }
};

// Common styled-components mixins
export const glassmorphism = `
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
`;

export const flexCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const absoluteCenter = `
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const truncateText = `
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const hoverScale = `
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

// Responsive utilities
export const media = {
  sm: `@media (min-width: ${theme.breakpoints.sm})`,
  md: `@media (min-width: ${theme.breakpoints.md})`,
  lg: `@media (min-width: ${theme.breakpoints.lg})`,
  xl: `@media (min-width: ${theme.breakpoints.xl})`
};

// Animation presets
export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  },
  slideInUp: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 }
  },
  slideInDown: {
    initial: { opacity: 0, y: -50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  },
  slideInLeft: {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  },
  slideInRight: {
    initial: { opacity: 0, x: 50 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 }
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 }
  },
  rotate: {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 2, repeat: Infinity, ease: "linear" }
  }
};

// Component variants
export const buttonVariants = {
  primary: {
    background: theme.gradients.primary,
    color: theme.colors.white,
    '&:hover': {
      boxShadow: theme.shadows.glow
    }
  },
  secondary: {
    background: theme.gradients.secondary,
    color: theme.colors.white
  },
  success: {
    background: theme.gradients.success,
    color: theme.colors.white
  },
  warning: {
    background: theme.gradients.warning,
    color: theme.colors.white
  },
  danger: {
    background: theme.gradients.danger,
    color: theme.colors.white
  },
  ghost: {
    background: 'transparent',
    color: theme.colors.white,
    border: `1px solid ${theme.colors.gray[300]}`
  }
};

export default theme;