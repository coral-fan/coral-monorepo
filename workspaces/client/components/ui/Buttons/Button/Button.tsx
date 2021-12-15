import { css } from '@emotion/react';
import { FC, ReactElement } from 'react';
import { ConditionalSpinner } from '../../Spinner';
import { BaseButtonProps } from '../types';
import { getGlobalButtonStyle } from '../utils';

export interface ButtonProps extends BaseButtonProps {
  icon?: ReactElement;
}

const buttonStyle = css`
  width: 100%;
  gap: 13.13px;
  padding: 16px;
  font-size: 14px;
  line-height: 0;
  text-transform: uppercase;
  font-weight: 700;
`;

export const Button: FC<ButtonProps> = ({ children, icon, variant, loading, ...props }) => (
  <button css={[getGlobalButtonStyle(variant), buttonStyle]} {...props}>
    <ConditionalSpinner loading={loading}>
      {icon}
      {children}
    </ConditionalSpinner>
  </button>
);
