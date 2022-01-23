import { ImageProps } from 'next/image';

export interface AvatarProps extends Omit<ImageProps, 'src'> {
  src?: ImageProps['src'];
  size: number;
  hasBorder: boolean;
}
