import { css } from '@emotion/react';
import tokens from 'styles/tokens';

export const getOffsetPosition = (x?: number, y?: number) => {
  const xOffset = `${x ?? 0}px `;
  const yOffset = `${y ?? 0}px`;

  return `${xOffset}${yOffset}`;
};
