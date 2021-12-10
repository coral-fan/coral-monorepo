import { FC } from 'react';
import { ButtonVariant } from '../types';
import { getButtonStyle } from '../utils';
interface ButtonProps {
  variant?: ButtonVariant;
  icon?: boolean;
}

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
