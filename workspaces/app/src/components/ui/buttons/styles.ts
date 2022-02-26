import { css } from '@emotion/react';

export const buttonBaseStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  min-height: 45px;
  min-width: 45px;

  &:hover {
    cursor: pointer;
  }

  &:disabled {
    cursor: not-allowed;
    filter: opacity(0.5);
  }
`;
