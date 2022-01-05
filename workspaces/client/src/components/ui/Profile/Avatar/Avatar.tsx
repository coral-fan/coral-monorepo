import Image from 'next/image';
import { css } from '@emotion/react';
import { AvatarProps } from './types';
import tokens from 'styles/tokens';

const DEFAULT_AVATAR =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const getImageStyle = (hasBorder: boolean) => {
  return css`
    border-radius: 50%;
    border: ${`solid 1px ${hasBorder ? `${tokens.color.white}` : 'transparent'}`};
  `;
};

export const Avatar = ({ src = DEFAULT_AVATAR, size, hasBorder }: AvatarProps) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <Image src={src} width={size} height={size} css={getImageStyle(hasBorder)} alt={''} />;
};
