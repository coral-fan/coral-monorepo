import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { ButtonVariant } from './types';

export const getButtonStyle = (variant: ButtonVariant = 'primary') => css`
  display: flex;
  align-items: center;
  gap: 13.13px;
  padding: 16px;
  border-radius: 31px;
  border: none;
  font-size: 14px;
  line-height: 0;
  text-transform: uppercase;
  font-weight: 700;
  height: 45px;
  color: ${tokens.color.pallete.white};
  background-color: ${tokens.color.action[variant]};
`;
