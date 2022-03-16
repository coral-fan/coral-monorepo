import { css } from '@emotion/react';

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
