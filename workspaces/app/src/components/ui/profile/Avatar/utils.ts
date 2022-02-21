import { css } from '@emotion/react';
import tokens from 'styles/tokens';

export const getOffsetPosition = (x?: number, y?: number) => {
  const xOffset = `${x ?? 0}px `;
  const yOffset = `${y ?? 0}px`;

  return `${xOffset}${yOffset}`;
};
export const getImageStyle = (hasBorder: boolean) => css`
  border-radius: 50%;
  border: ${`solid 1px ${hasBorder ? `${tokens.border.color.primary}` : 'transparent'}`};
`;
