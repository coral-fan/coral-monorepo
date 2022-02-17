import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { color } from 'styles';
import { BadgeSize, BadgeVariant } from './types';
import { badgeSizeDictionary } from './consts';

export const getBadgeStyle = (size: BadgeSize, variant: BadgeVariant) => {
  const isPrimaryVariant = variant === 'primary';

  return css`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: ${badgeSizeDictionary[size].badge}px;
    height: ${badgeSizeDictionary[size].badge}px;
    color: ${color.cloud};
    border: ${isPrimaryVariant ? 'none' : `solid 1px ${tokens.color.border.primary}`};
    background-color: ${isPrimaryVariant ? tokens.color.background.brand : 'none'};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
  `;
};
