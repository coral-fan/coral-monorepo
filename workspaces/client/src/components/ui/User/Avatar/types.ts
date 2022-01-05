import { ComponentProps } from 'react';
import { avatarSizeDictionary } from './consts';

export interface AvatarProps extends ComponentProps<'img'> {
  size: keyof typeof avatarSizeDictionary;
  showBorder: boolean;
}
