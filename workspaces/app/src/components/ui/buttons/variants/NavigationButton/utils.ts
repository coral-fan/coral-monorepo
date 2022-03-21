import { css } from '@emotion/react';
import tokens, { colors, DESKTOP_BREAKPOINT } from 'styles/tokens';
import { buttonBaseStyle } from '../../styles';

export const getNavigationButtonStyle = (isTransparent: boolean) => css`
  ${buttonBaseStyle};

  --button-size: ${tokens.buttons.size.mobile};

  @media (min-width: ${DESKTOP_BREAKPOINT}) {
    --button-size: ${tokens.buttons.size.desktop};
  }

  width: var(--button-size);
  height: var(--button-size);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${isTransparent ? 'transparent' : colors.gray[11]};
`;
