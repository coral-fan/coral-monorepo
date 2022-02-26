import { ComponentProps } from 'react';
import { CONTROL_BUTTON_STYLE } from './consts';
import { LeftArrowIcon } from 'components/ui';

export const PreviousButton = (props: ComponentProps<'button'>) => (
  <button css={CONTROL_BUTTON_STYLE} {...props}>
    <LeftArrowIcon size={20} />
  </button>
);
