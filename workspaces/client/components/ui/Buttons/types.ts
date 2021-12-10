import { ComponentProps } from 'react';

export type ButtonVariant = 'primary' | 'secondary';
export interface BaseButtonProps extends ComponentProps<'button'> {
  variant?: ButtonVariant;
}
