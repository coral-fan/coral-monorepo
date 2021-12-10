import { css } from '@emotion/react';
import { FC } from 'react';
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
  width: 45px;
  justify-content: center;
`;

export const PlusButton: FC<PlusButtonProps> = ({ variant }) => (
  <button css={[getGlobalButtonStyle(variant), plusButtonStyle]}>
    <PlusIcon />
  </button>
);
