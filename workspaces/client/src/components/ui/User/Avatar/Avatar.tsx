import { getAvatarStyle } from './utils';
import { AvatarProps } from './types';

export const Avatar = ({ src, size, showBorder }: AvatarProps) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} css={getAvatarStyle({ size, showBorder })} alt={''} />;
};
