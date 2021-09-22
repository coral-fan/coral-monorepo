import { css } from '@emotion/react';
import { createTheme } from 'theme-in-css';

const tokens = createTheme({
  color: {
    black: '#000',
    white: '#FFF',
  },
});

export default tokens;

export const globalTokens = css`
  :root {
    ${tokens.css.string}
  }
`;
