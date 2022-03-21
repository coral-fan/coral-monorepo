import { ComponentProps } from 'react';
import { CloseIcon } from 'components/ui';
import { NavigationButton } from 'components/ui';

export const CloseButton = (props: ComponentProps<'button'>) => (
  <NavigationButton {...props}>
    <CloseIcon />
  </NavigationButton>
);
