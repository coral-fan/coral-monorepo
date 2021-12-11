import { css } from '@emotion/react';
import { createTheme } from 'theme-in-css';

const tokens = createTheme({
  breakpoint: {
    desktop: '716px',
  },
  spacing: {
    mobile: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '40px',
    },
    desktop: {
      xs: '4px',
      sm: '8px',
      md: '18px',
      lg: '36px',
      xl: '60px',
    },
  },
  color: {
    background: {
      primary: '#171818',
      secondary: '#322D36',
      tertiary: '#3F3A43',
    },
    action: {
      primary: '#6C28C7',
      secondary: '#604F75',
    },
    gradient: {
      primary: '',
    },
    gray: '#9D9D9D',
    white: '#FFFFFF',
  },
});

export default tokens;

export const globalTokens = css`
  :root {
    ${tokens.css.string}
  }
`;
