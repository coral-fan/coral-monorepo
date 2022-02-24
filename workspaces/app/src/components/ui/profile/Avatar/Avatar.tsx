import { ForwardedRef, forwardRef, ReactEventHandler } from 'react';

import Image, { ImageProps } from 'next/image';
import styled from '@emotion/styled';

import { formatObjectPosition } from './utils';

import { css } from '@emotion/react';

type WrapperProps = Pick<Parameters<typeof Avatar>[0], 'size' | 'ref'>;

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

export type OffsetPercentages = [number, number];
export interface AvatarProps extends ImageProps {
  size: number;
  offsetPercentages: OffsetPercentages;
  scale: number;
}

const getScaleStyling = (scale: number) =>
  css`
    transform: scale(${scale});
  `;

export const Avatar = forwardRef(
  (
    { src, size, offsetPercentages = [0, 0], scale }: AvatarProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const objectPosition = formatObjectPosition(...offsetPercentages);
    return (
      <Wrapper size={size} ref={ref}>
        <Image
          draggable={ref === null}
          alt={''}
          layout={'fill'}
          priority={true}
          objectFit={'cover'}
          src={src}
          objectPosition={objectPosition}
          css={getScaleStyling(scale)}
        />
      </Wrapper>
    );
  }
);
