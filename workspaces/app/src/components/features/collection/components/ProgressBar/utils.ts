import { css } from '@emotion/react';
import { ProgressBarProps } from './ProgressBar';

export const getProgressBarStyle = ({ numMinted, maxSupply }: ProgressBarProps) =>
  css`
    width: ${(numMinted / maxSupply) * 100}%;
  `;
