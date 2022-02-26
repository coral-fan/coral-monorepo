import { ComponentProps } from 'react';
import { CONTROL_BUTTON_STYLE } from './consts';
import { CloseIcon } from 'components/ui';

export const CloseButton = (props: ComponentProps<'button'>) => (
  <button css={CONTROL_BUTTON_STYLE} {...props}>
    <CloseIcon size={22.5} />
  </button>
);
