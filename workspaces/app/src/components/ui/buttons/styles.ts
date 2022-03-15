import { css } from '@emotion/react';

export const buttonBaseStyle = css`
  width: 100%;
  border: none;
  background-color: transparent;
  min-height: 45px;
  min-width: 45px;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    filter: opacity(0.7);
    cursor: not-allowed;
  }
`;
