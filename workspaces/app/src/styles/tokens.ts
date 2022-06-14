import { css } from '@emotion/react';
import { CLIENT_ENVIRONMENT } from 'consts';
import { createTheme } from 'theme-in-css';

/*
The codebase is Mobile first, meaning the default styling is for small
devices. Media queries using the below breakpoints should provide 
styling for devices above the given breakpoint, e.g. the QUERY.TABLET 
styling will apply to devices size greater than the TABLET_MIN.
*/
export const BREAKPOINT = {
  TABLET_MIN: 550,
  LAPTOP_MIN: 1100,
  DESKTOP_MIN: 1500,
};

export const QUERY = {
  TABLET: `(min-width: ${BREAKPOINT.TABLET_MIN}px)`,
  LAPTOP: `(min-width: ${BREAKPOINT.LAPTOP_MIN}px)`,
  DESKTOP: `(min-width: ${BREAKPOINT.DESKTOP_MIN}px)`,
};

/*
Color values are set here. 10 is the "base" value, 
9 through 0 are lighter (8 is lighter than 9) and
11 through 20 are darker (12 is darker than 11).

Setting 10 as the base value provides flexibility for
various shades, lighter and darker, without requiring
a negative index.
*/
export const colors = createTheme({
  coral: {
    10: '#FFB890', // (255, 184, 144)
  },
  cloud: {
    10: '#F0F0F0', // (240, 240, 240)
  },
  slate: {
    10: '#1E1E1E', // (30, 30, 30)
  },
  gray: {
    9: '#929292', // (146, 146, 146)
    10: '#595959', // (89, 89, 89)
    11: '#484848', // (72, 72, 72)
    12: '#2D2D2D', // (45, 45, 45)
  },
  red: {
    10: '#E13214',
  },
});

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
  layout: {
    padding: {
      mobile: {
        vertical: '14px',
        horizontal: '20px',
      },
      desktop: {
        vertical: '24px',
        horizontal: '64px',
      },
    },
    width: {
      max: '1540px',
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
    weight: {
      normal: '400',
      bold: '500',
    },
    color: {
      primary: colors.cloud[10],
      secondary: colors.gray[9],
      contrast: colors.slate[10],
      error: colors.red[10],
      brand: colors.coral[10],
    },
  },
  background: {
    color: {
      primary: colors.slate[10],
      secondary: colors.gray[12],
      tertiary: colors.gray[10],
      contrast: colors.cloud[10],
      brand: colors.coral[10],
    },
  },
  border: {
    radius: {
      sm: '14px',
      md: '20px',
      lg: '25px',
      xl: '30px',
      xxl: '37px',
    },
    color: {
      primary: colors.cloud[10],
      secondary: colors.gray[10],
      brand: colors.coral[10],
      error: colors.red[10],
    },
  },
  buttons: {
    size: {
      mobile: '45px',
      desktop: '60px',
    },
  },
});

export default tokens;

export const globalTokens = css`
  :root {
    ${colors.css.string}
    ${tokens.css.string}
  }
`;
