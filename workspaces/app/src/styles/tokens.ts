import { css } from '@emotion/react';
import { createTheme } from 'theme-in-css';

export const DESKTOP_BREAKPOINT = '716px';

const tokens = createTheme({
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
    gray: '#9D9D9D',
    white: '#FFFFFF',
    red: '#F01F51',
  },
  gradient: {
    primary: 'linear-gradient(121.65deg, #3F2D4D 8.25%, #292030 98.53%)',
  },
});

export default tokens;

export const globalTokens = css`
  :root {
    ${tokens.css.string}
  }
`;
