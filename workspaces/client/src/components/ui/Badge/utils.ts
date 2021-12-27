import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { BadgeSize, BadgeVariant } from './types';
import { badgeSizeDictionary } from './consts';

const badgeVariantDictionary = {
  primary: {
    backgroundColor: tokens.color.action['primary'],
    border: 'none',
  },
  secondary: {
    backgroundColor: 'transparent',
    border: `solid 1px ${tokens.color.white}`,
  },
};

export const getBadgeStyle = (size: BadgeSize, variant: BadgeVariant) => css`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: ${badgeVariantDictionary[variant].border};
  width: ${badgeSizeDictionary[size]};
  height: ${badgeSizeDictionary[size]};
  color: ${tokens.color.white};
  background-color: ${badgeVariantDictionary[variant].backgroundColor};
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
`;
