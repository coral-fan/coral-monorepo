import { css } from '@emotion/react';
import { createTheme } from 'theme-in-css';

export const DESKTOP_BREAKPOINT = '716px';

/*
Color values are set here. 10 is the "base" value, 
9 through 0 are lighter (8 is lighter than 9) and
11 through 20 are darker (12 is darker than 11).

Setting 10 as the base value provides flexibility for
various shades, lighter and darker, without requiring
a negative index.
*/
const colors = {
  coral: {
    10: '#FFB890', // (255, 184, 144)
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

const color = {
  coral: colors.coral[10],
  cloud: colors.cloud[10],
  cloud_11: colors.cloud[11],
  slate: colors.slate[10],
  gray: colors.gray[10],
  gray_9: colors.gray[9],
  gray_10: colors.gray[10],
  gray_11: colors.gray[11],
  gray_12: colors.gray[12],
  red: colors.red[10],
};

export const COLOR = createTheme(color);

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
  font: {
    size: {
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
    color: {
      primary: color.cloud,
      secondary: color.gray_9,
      button: color.slate,
      error: color.red,
      brand: color.coral,
    },
  },
  background: {
    color: {
      primary: color.slate,
      secondary: color.gray,
      tertiary: color.gray_11,
      brand: color.coral,
    },
  },
  border: {
    radius: {
      sm: '14px',
      md: '20px',
      lg: '25px',
      xl: '30px',
    },
    color: {
      primary: color.cloud,
      secondary: color.gray,
      brand: color.coral,
      error: color.red,
    },
  },
});

export default tokens;

export const globalTokens = css`
  :root {
    ${COLOR.css.string};
    ${tokens.css.string}
  }
`;
