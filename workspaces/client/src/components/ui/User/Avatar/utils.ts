import { css } from '@emotion/react';
import tokens from 'styles/tokens';
import { AvatarProps } from './types';
import { avatarSizeDictionary } from './consts';

export const getAvatarStyle = ({ size, showBorder }: AvatarProps) => {
  return css`
    width: ${avatarSizeDictionary[size]}px;
    height: ${avatarSizeDictionary[size]}px;
    border: ${`solid 1px ${showBorder ? `${tokens.color.white}` : 'transparent'}`};
    border-radius: 50%;
  `;
};
