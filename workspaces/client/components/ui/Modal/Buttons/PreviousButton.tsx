import { ComponentProps } from 'react';
import { CONTROL_BUTTON_STYLE } from './consts';

export const LeftArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.875 10H3.125"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.75 4.37503L3.125 10L8.75 15.625"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const PreviousButton = (props: ComponentProps<'button'>) => (
  <button css={CONTROL_BUTTON_STYLE} {...props}>
    <LeftArrowIcon />
  </button>
);
