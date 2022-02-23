import { ForwardedRef, forwardRef, ReactEventHandler } from 'react';

import Image, { ImageProps } from 'next/image';
import styled from '@emotion/styled';

import { DEFAULT_AVATAR } from './consts';
import { formatObjectPosition } from './utils';

import { css } from '@emotion/react';

type WrapperProps = Omit<Parameters<typeof Avatar>[0], 'src' | 'percentageOffsets'>;

const draggableHoverStyle = css`
  &:hover {
    cursor: move;
  }
`;

const Wrapper = styled.div<WrapperProps>`
  --size: ${({ size }) => size}px;
  height: var(--size);
  width: var(--size);
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  ${({ ref }) => (ref === null ? null : draggableHoverStyle)}
`;

export type PercentageOffsets = [number, number];
export interface AvatarProps extends Omit<ImageProps, 'src'> {
  src?: ImageProps['src'];
  size: number;
  percentageOffsets: PercentageOffsets;
}

export const Avatar = forwardRef(
  (
    { src = DEFAULT_AVATAR, size, percentageOffsets: [x, y] = [0, 0] }: AvatarProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const objectPosition = formatObjectPosition(x, y);
    return (
      <Wrapper size={size} ref={ref}>
        <Image
          draggable={false}
          alt={''}
          layout={'fill'}
          priority={true}
          objectPosition={objectPosition}
          objectFit={'cover'}
          src={src}
        />
      </Wrapper>
    );
  }
);
