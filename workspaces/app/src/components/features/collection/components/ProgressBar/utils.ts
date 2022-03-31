import { css } from '@emotion/react';
import { ProgressBarProps } from './ProgressBar';

export const getProgressBarStyle = ({ numMinted, maxMintable }: ProgressBarProps) =>
  css`
    width: ${(numMinted / maxMintable) * 100}%;
  `;
