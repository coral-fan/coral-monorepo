import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { BUTTON_SIZE } from './consts/consts';
import { ButtonVariant } from './types';

export const getGlobalButtonStyle = (variant: ButtonVariant = 'primary') => css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 31px;
  border: none;
  height: ${BUTTON_SIZE};
  color: ${tokens.color.white};
  background-color: ${tokens.color.action[variant]};
`;
