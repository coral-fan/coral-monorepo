import { ReactNode } from 'react';
import { ConditionalSpinner } from '../../Spinner';
import { ComponentProps } from 'react';
import { buttonBaseStyle } from '../styles';

export interface BaseButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
  loading?: boolean;
  spinnerSize?: string;
}

export const BaseButton = ({
  children,
  loading,
  disabled,
  spinnerSize,
  ...props
}: BaseButtonProps) => (
  <button css={buttonBaseStyle} disabled={disabled} {...props}>
    <ConditionalSpinner loading={loading} size={spinnerSize} center={true}>
      {children}
    </ConditionalSpinner>
  </button>
);
