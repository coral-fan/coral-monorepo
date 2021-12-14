import { ComponentProps, ReactElement, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary';

export interface BaseButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
  loading?: boolean;
  icon?: ReactElement;
}
