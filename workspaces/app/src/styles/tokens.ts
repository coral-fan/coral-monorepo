import { css } from '@emotion/react';
import { createTheme } from 'theme-in-css';

export const DESKTOP_BREAKPOINT = '716px';

const colors = {
  coral: {
    10: '#FFB890',
  },
  cloud: {
    10: '#F0F0F0', // (240, 240, 240)
    11: '#E6E6E6', // (230, 230, 230)
  },
  slate: {
    10: '#1E1E1E', // (30, 30, 30)
  },
  gray: {
    9: '#929292', // (146, 146, 146)
    10: '#595959', // (89, 89, 89)
    11: '#484848', // (72, 72, 72)
    12: '#333333', // (51, 51, 51)
  },
  red: {
    10: '#E13214',
  },
};

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
  text: {
    font_size: {
      xs: '12px',
      sm: '15px',
      md: '18px',
      lg: '24px',
      xl: '32px',
      xxl: '64px',
    },
    line_height: {
      xs: '14px',
      sm: '19px',
      md: '22px',
      lg: '24px',
      xl: '34px',
      xxl: '62px',
    },
    letter_spacing: {
      xs: '0.05em',
      sm: '0.02em',
      md: '0.01em',
      lg: '0em',
      xl: '-0.005em',
      xxl: '-0.02em',
    },
  },
  color: {
    background: {
      primary: colors.slate[10],
      secondary: colors.gray[10],
      tertiary: colors.gray[11],
      brand: colors.coral[10],
      white: colors.cloud[10],
    },
    font: {
      primary: colors.cloud[10],
      secondary: colors.gray[9],
      dark: colors.slate[10],
      error: colors.red[10],
      brand: colors.coral[10],
    },
    border: {
      primary: colors.cloud[10],
      secondary: colors.gray[10],
      brand: colors.coral[10],
      error: colors.red[10],
    },
  },
  border: {
    radius: {
      sm: '14px',
      md: '20px',
      lg: '25px',
      xl: '30px',
    },
  },
});

export default tokens;

export const globalTokens = css`
  :root {
    ${tokens.css.string}
  }
`;
