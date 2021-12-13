import { css } from '@emotion/react';
import { BUTTON_SIZE } from '../consts';
import { ConditionalSpinner } from '../../Spinner';
import { BaseButtonProps as PlusButtonProps } from '../types';
import { getGlobalButtonStyle } from '../utils';

const PlusIcon = () => (
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

const plusButtonStyle = css`
  width: ${BUTTON_SIZE};
`;

export const PlusButton = ({ variant, loading = false, ...props }: PlusButtonProps) => (
  <button css={[getGlobalButtonStyle(variant), plusButtonStyle]} {...props}>
    <ConditionalSpinner loading={loading}>
      <PlusIcon />
    </ConditionalSpinner>
  </button>
);
