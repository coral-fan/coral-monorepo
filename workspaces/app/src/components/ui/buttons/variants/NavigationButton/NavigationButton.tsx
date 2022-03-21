import { ComponentProps, FC } from 'react';
import { BaseButton } from 'components/ui/buttons/BaseButton';
import { getNavigationButtonStyle } from './utils';

export const NavigationButton: FC<ComponentProps<'button'>> = ({ children, ...props }) => (
  <BaseButton css={getNavigationButtonStyle(false)} {...props}>
    {children}
  </BaseButton>
);
