import { css } from '@emotion/react';
import { FC } from 'react';
import tokens from 'styles/tokens';

type ButtonVariant = 'primary' | 'secondary';
interface ButtonProps {
  variant?: ButtonVariant;
  icon?: boolean;
}

const getButtonStyle = (variant: ButtonVariant = 'primary') => css`
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

const PlusIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3.125 10H16.875"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 3.125V16.875"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Button: FC<ButtonProps> = ({ children, icon, variant }) => (
  <button css={getButtonStyle(variant)}>
    {icon && <PlusIcon />}
    {children}
  </button>
);
