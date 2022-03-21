import { css } from '@emotion/react';
import tokens, { colors, DESKTOP_BREAKPOINT } from 'styles/tokens';

export const buttonBaseStyle = css`
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    filter: opacity(0.5);
    cursor: not-allowed;
  }
`;
