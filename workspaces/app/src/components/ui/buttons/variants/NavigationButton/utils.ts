import { css } from '@emotion/react';
import tokens, { colors, QUERIES } from 'styles/tokens';
import { buttonBaseStyle } from '../../styles';

export const getNavigationButtonStyle = (isTransparent: boolean) => css`
  ${buttonBaseStyle};

  --button-size: ${tokens.buttons.size.mobile};

  @media ${QUERIES.laptopAndUp} {
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
