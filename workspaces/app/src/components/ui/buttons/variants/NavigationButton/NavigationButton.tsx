import { ComponentProps, ReactNode } from 'react';
import { BaseButton } from 'components/ui/buttons/BaseButton';
import { getNavigationButtonStyle } from './utils';

interface NavigationButtonProps extends ComponentProps<'button'> {
  children: ReactNode;
}
export const NavigationButton = ({ children, ...props }: NavigationButtonProps) => (
  <BaseButton css={getNavigationButtonStyle(false)} {...props}>
    {children}
  </BaseButton>
);
