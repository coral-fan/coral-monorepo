import { css } from '@emotion/react';
import tokens from 'styles/tokens';

export const textStyle = css`
  text-transform: uppercase;
  font-size: ${tokens.font.size.xs};
  font-weight: ${tokens.font.weight.normal};
  line-height: ${tokens.font.line_height.xs};
  letter-spacing: ${tokens.font.letter_spacing.xs};
`;
