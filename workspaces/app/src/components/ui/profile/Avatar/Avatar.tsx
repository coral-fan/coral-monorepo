import Image from 'next/image';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { AvatarProps } from './types';
import tokens from 'styles/tokens';

const DEFAULT_AVATAR =
  'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png';

type WrapperProps = Omit<AvatarProps, 'src'>;

const Wrapper = styled.div<WrapperProps>`
  --size: ${({ size }) => size}px;
  height: var(--size);
  width: var(--size);
  position: relative;
`;

const getOffsetPosition = (x?: number, y?: number) => {
  if (x === undefined && y === undefined) {
    return undefined;
  }

  const xOffset = x === undefined ? '' : `${x}px `;
  const yOffset = y === undefined ? '' : `${y}px`;

  return `${xOffset}${yOffset}`;
};
const getImageStyle = (hasBorder: boolean) => css`
  border-radius: 50%;
  border: ${`solid 1px ${hasBorder ? `${tokens.border.color.primary}` : 'transparent'}`};
`;

export const Avatar = ({
  src = DEFAULT_AVATAR,
  size,
  hasBorder = false,
  xOffset,
  yOffset,
}: AvatarProps) => {
  const objectPosition = getOffsetPosition(xOffset, yOffset);
  return (
    <Wrapper hasBorder={hasBorder} size={size}>
      <Image
        draggable={false}
        alt={''}
        layout={'fill'}
        priority={true}
        objectPosition={objectPosition}
        src={src}
        css={getImageStyle(hasBorder)}
      />
    </Wrapper>
  );
};
