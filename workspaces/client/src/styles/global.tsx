import { css, Global } from '@emotion/react';
import tokens, { globalTokens } from './tokens';

export const globalStyles = css`
  @font-face {
    font-family: 'Kunst Grotesk';
    font-style: 'normal';
    font-weight: 400;
    font-display: swap;
    src: './fonts/FTKunstGrotesk-Regular.woff2' format('woff2');
  }

  @font-face {
    font-family: 'Kunst Grotesk';
    font-style: 'normal';
    font-weight: 500;
    font-display: swap;
    src: './fonts/FTKunstGrotesk-Medium.woff2' format('woff2');
  }

  @font-face {
    font-family: 'Kunst Grotesk';
    font-style: 'normal';
    font-weight: 700;
    font-display: swap;
    src: './fonts/FTKunstGrotesk-Bold.woff2' format('woff2');
  }

  @font-face {
    font-family: 'Kunst Grotesk';
    font-style: 'italic';
    font-weight: 400;
    font-display: swap;
    src: './fonts/FTKunstGrotesk-RegularItalic.woff2' format('woff2');
  }

  @font-face {
    font-family: 'Kunst Grotesk';
    font-style: 'italic';
    font-weight: 500;
    font-display: swap;
    src: './fonts/FTKunstGrotesk-MediumItalic.woff2' format('woff2');
  }

  @font-face {
    font-family: 'Kunst Grotesk';
    font-style: 'italic';
    font-weight: 700;
    font-display: swap;
    src: './fonts/FTKunstGrotesk-BoldItalic.woff2' format('woff2');
  }

  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'Kunst Grotesk', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: ${tokens.color.white};
  }

  html {
    background-color: ${tokens.color.background.primary};
  }
`;
export const GlobalStyles = () => <Global styles={[globalStyles, globalTokens]} />;
