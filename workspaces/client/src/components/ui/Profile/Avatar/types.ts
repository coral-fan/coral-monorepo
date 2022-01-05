import { ImageProps } from 'next/image';

export interface AvatarProps extends ImageProps {
  size: number;
  hasBorder: boolean;
}
