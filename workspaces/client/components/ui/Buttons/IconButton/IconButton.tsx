import { css } from '@emotion/react';
import { BUTTON_SIZE } from '../consts';
import { ConditionalSpinner } from '../../Spinner';
import { BaseButtonProps as IconButtonProps } from '../types';
import { getGlobalButtonStyle } from '../utils';

// default icon
const PlusIcon = (
  <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.1875 15.5H25.8125"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.5 5.18753V25.8125"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const iconButtonStyle = css`
  width: ${BUTTON_SIZE};
`;

export const IconButton = ({
  variant,
  icon = PlusIcon,
  loading = false,
  ...props
}: IconButtonProps) => (
  <button css={[getGlobalButtonStyle(variant), iconButtonStyle]} {...props}>
    <ConditionalSpinner loading={loading}>{icon}</ConditionalSpinner>
  </button>
);
