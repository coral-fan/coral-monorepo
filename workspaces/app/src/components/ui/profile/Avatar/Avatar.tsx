import { ReactEventHandler } from 'react';

import Image, { ImageProps } from 'next/image';
import styled from '@emotion/styled';

import { DEFAULT_AVATAR } from './consts';
import { Draggable } from './types';
import { getOffsetPosition } from './utils';

import tokens from 'styles/tokens';

type WrapperProps = Omit<AvatarProps, 'src'>;

const Wrapper = styled.div<WrapperProps>`
  --size: ${({ size }) => size}px;
  height: var(--size);
  width: var(--size);
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  border: ${({ hasBorder }) =>
    `solid 1px ${hasBorder ? `${tokens.border.color.primary}` : 'transparent'}`};
`;

interface AvatarProps extends Omit<ImageProps, 'src'>, Draggable {
  src?: ImageProps['src'];
  size: number;
  hasBorder: boolean;
}

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
        objectFit={'none'}
        src={src}
      />
    </Wrapper>
  );
};
