import Image from 'next/image';
import styled from '@emotion/styled';
import { AvatarProps, StyledImageProps } from './types';
import tokens from 'styles/tokens';

const DEFAULT_AVATAR =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

const StyledImage = styled(Image)<StyledImageProps>`
  border: solid 1px ${(props) => (props.hasBorder ? `${tokens.color.white}` : 'transparent')};
  border-radius: 50%;
`;

export const Avatar = ({ src, size, hasBorder }: AvatarProps) => {
  const imageUrl = src ? src : DEFAULT_AVATAR;
  // eslint-disable-next-line @next/next/no-img-element
  return <StyledImage src={imageUrl} width={size} height={size} hasBorder={hasBorder} alt={''} />;
};
