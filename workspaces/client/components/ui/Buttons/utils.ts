import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { ButtonVariant } from './types';

export const getGlobalButtonStyle = (variant: ButtonVariant = 'primary') => css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 31px;
  border: none;
  height: 45px;
  color: ${tokens.color.white};
  background-color: ${tokens.color.action[variant]};
`;
