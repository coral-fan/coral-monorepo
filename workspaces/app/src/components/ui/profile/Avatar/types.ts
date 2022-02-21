import { NoEthereumProviderError } from '@web3-react/injected-connector';
import { ImageProps } from 'next/image';

export interface Draggable {
  xOffset?: number;
  yOffset?: number;
}
export interface AvatarProps extends Omit<ImageProps, 'src'>, Draggable {
  src?: ImageProps['src'];
  size: number;
  hasBorder: boolean;
}
