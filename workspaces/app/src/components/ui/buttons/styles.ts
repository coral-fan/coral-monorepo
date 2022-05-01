import { css } from '@emotion/react';

export const buttonBaseStyle = css`
  border: none;
  background-color: transparent;

  &:hover {
    cursor: pointer;
    filter: brightness(0.9);
  }

  &:disabled {
    filter: opacity(0.4);
    cursor: not-allowed;
  }
`;
