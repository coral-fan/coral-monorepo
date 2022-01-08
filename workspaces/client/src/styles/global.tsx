import { css, Global } from '@emotion/react';
import tokens, { globalTokens } from './tokens';

export const globalStyles = css`
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&display=swap');
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu,
      Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    color: ${tokens.color.white};
  }

  html {
    background-color: ${tokens.color.background.primary};
  }
`;
export const GlobalStyles = () => <Global styles={[globalStyles, globalTokens]} />;
