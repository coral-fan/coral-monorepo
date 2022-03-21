import { css } from '@emotion/react';
import tokens from 'styles/tokens';

interface InputStyleProps {
  type: 'input' | 'textarea';
  error?: string;
}

export const getInputStyle = ({ type, error }: InputStyleProps) => css`
  background-color: ${tokens.background.color.primary};
  border-radius: ${tokens.border.radius.sm};
  height: ${type === 'input' ? '45px' : '100px'};
  font-size: ${tokens.font.size.sm};
  color: ${tokens.font.color.primary};
  padding: 13px 10px 13px 16px;
  border: ${`solid ${error ? tokens.border.color.error : 'transparent'} 1px`};
  resize: none;

  &:focus {
    ${error ? undefined : `border-color: ${tokens.border.color.brand};`}
    outline: none;
  }
`;

export const getInputId = (label: string) => label.toLowerCase().split(' ').join('-');
