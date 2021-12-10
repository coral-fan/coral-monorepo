import { css } from '@emotion/react';
import { FC } from 'react';
import { BaseButtonProps } from '../types';
import { getGlobalButtonStyle } from '../utils';
interface ButtonProps extends BaseButtonProps {
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

const buttonStyle = css`
  gap: 13.13px;
  padding: 16px;
  font-size: 14px;
  line-height: 0;
  text-transform: uppercase;
  font-weight: 700;
`;

export const Button: FC<ButtonProps> = ({ children, icon, variant }) => (
  <button css={[getGlobalButtonStyle(variant), buttonStyle]}>
    {icon && <PlusIcon />}
    {children}
  </button>
);
