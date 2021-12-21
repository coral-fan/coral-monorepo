import { css } from '@emotion/react';
import { FC } from 'react';
import { ConditionalSpinner } from '../../Spinner';
import { BaseButtonProps } from '../types';
import { getGlobalButtonStyle } from '../utils';

const buttonStyle = css`
  width: 100%;
  gap: 13.13px;
  padding: 16px;
  font-size: 14px;
  line-height: 0;
  text-transform: uppercase;
  font-weight: 700;
`;

export const Button: FC<BaseButtonProps> = ({ children, variant, loading, ...props }) => (
  <button css={[getGlobalButtonStyle(variant), buttonStyle]} {...props}>
    <ConditionalSpinner loading={loading}>{children}</ConditionalSpinner>
  </button>
);
