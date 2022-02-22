import { ForwardedRef, forwardRef, ReactEventHandler } from 'react';

import Image, { ImageProps } from 'next/image';
import styled from '@emotion/styled';

import { DEFAULT_AVATAR } from './consts';
import { Draggable } from './types';
import { formatObjectPosition } from './utils';

import tokens from 'styles/tokens';
import { css } from '@emotion/react';
import { AVATAR_SIZE } from 'components/features/user/components/UpdateProfile/components/UpdateProfilePhotoModal/components';

type WrapperProps = Omit<AvatarProps, 'src'> & { isDraggable: boolean };

const draggableHoverStyle = css`
  &:hover {
    cursor: move;
  }
`;

const Wrapper = styled.div<WrapperProps>`
  --size: ${AVATAR_SIZE}px;
  height: var(--size);
  width: var(--size);
  transform: scale(${({ size }) => size / AVATAR_SIZE});
  margin: -${({ size }) => (AVATAR_SIZE - size) / 2}px;
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  border: ${({ hasBorder }) =>
    `solid 1px ${hasBorder ? `${tokens.border.color.primary}` : 'transparent'}`};
  ${({ isDraggable }) => (isDraggable ? draggableHoverStyle : null)}
`;

interface AvatarProps extends Omit<ImageProps, 'src'>, Draggable {
  src?: ImageProps['src'];
  size: number;
  hasBorder: boolean;
}

export const Avatar = forwardRef(
  (
    { src = DEFAULT_AVATAR, size, hasBorder = false, xOffset, yOffset }: AvatarProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const objectPosition = formatObjectPosition(xOffset, yOffset);
    return (
      <Wrapper hasBorder={hasBorder} size={size} isDraggable={ref !== null} ref={ref}>
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
  }
);
