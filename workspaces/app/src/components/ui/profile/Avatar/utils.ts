import { css } from '@emotion/react';
import tokens from 'styles/tokens';

export const formatObjectPosition = (x?: number, y?: number) => {
  const xOffset = `${x ?? 0}% `;
  const yOffset = `${y ?? 0}%`;

  return `${xOffset}${yOffset}`;
};
