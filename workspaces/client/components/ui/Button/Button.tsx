import styled from '@emotion/styled';
import tokens from 'styles/tokens';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonProps>`
  padding: 16px;
  border-radius: 31px;
  border: none;
  font-size: 14px;
  line-height: 0;
  text-transform: uppercase;
  font-weight: 700;
  height: 45px;
  color: ${tokens.color.pallete.white};
  background-color: ${({ variant = 'primary' }) => tokens.color.action[variant]};
`;
