import { FC } from 'react';
import { ConditionalSpinner } from '../../Spinner';
import { ComponentProps } from 'react';
import { buttonBaseStyle } from '../styles';

export interface BaseButtonProps extends ComponentProps<'button'> {
  loading?: boolean;
  disabled?: false;
}

export const BaseButton: FC<BaseButtonProps> = ({ children, loading, disabled, ...props }) => (
  <button css={buttonBaseStyle} disabled={disabled} {...props}>
    <ConditionalSpinner loading={loading}>{children}</ConditionalSpinner>
  </button>
);
