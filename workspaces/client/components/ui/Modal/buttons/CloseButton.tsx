import { ComponentProps } from 'react';
import { CONTROL_BUTTON_STYLE } from './consts';

export const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.625 4.37503L4.375 15.625"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.625 15.625L4.375 4.37503"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CloseButton = (props: ComponentProps<'button'>) => (
  <button css={CONTROL_BUTTON_STYLE} {...props}>
    <CloseIcon />
  </button>
);
