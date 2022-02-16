import Image from 'next/image';
import { css } from '@emotion/react';
import { AvatarProps } from './types';
import tokens from 'styles/tokens';

const DEFAULT_AVATAR =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const getImageStyle = (hasBorder: boolean) => css`
  border-radius: 50%;
  border: ${`solid 1px ${hasBorder ? `${tokens.color.border.primary}` : 'transparent'}`};
`;

export const Avatar = ({ src = DEFAULT_AVATAR, size, hasBorder }: AvatarProps) => (
  <Image src={src} width={size} height={size} css={getImageStyle(hasBorder)} alt={''} />
);
