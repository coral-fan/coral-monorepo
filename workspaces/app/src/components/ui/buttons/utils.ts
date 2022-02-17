import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { BUTTON_SIZE } from './consts';
import { buttonBaseStyle } from './styles';
import { ButtonVariant } from './types';

export const getButtonVariantStyle = (variant: ButtonVariant = 'primary') => css`
  ${buttonBaseStyle};
  border-radius: 31px;
  height: ${BUTTON_SIZE};
  color: ${tokens.font.color.primary};
  background-color: ${tokens.background.color.brand};
`;
