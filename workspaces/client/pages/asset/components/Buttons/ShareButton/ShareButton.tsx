import { Button } from 'components/ui/buttons';
import { ComponentProps } from 'react';

/*
  passing svg react element as const instead of a functional component
  to keep component more lightweight
*/
const SHARE_ICON = (
  <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.21875 5.03039L10.5 1.75L13.7812 5.03039"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10.5 10.5V1.75232"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14.25 8H16.125C16.2908 8 16.4497 8.06585 16.5669 8.18306C16.6842 8.30027 16.75 8.45924 16.75 8.625V16.75C16.75 16.9158 16.6842 17.0747 16.5669 17.1919C16.4497 17.3092 16.2908 17.375 16.125 17.375H4.875C4.70924 17.375 4.55027 17.3092 4.43306 17.1919C4.31585 17.0747 4.25 16.9158 4.25 16.75V8.625C4.25 8.45924 4.31585 8.30027 4.43306 8.18306C4.55027 8.06585 4.70924 8 4.875 8H6.75"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ShareButton = (props: ComponentProps<'button'>) => (
  <Button icon={SHARE_ICON} variant={'secondary'} {...props}>
    Share
  </Button>
);
