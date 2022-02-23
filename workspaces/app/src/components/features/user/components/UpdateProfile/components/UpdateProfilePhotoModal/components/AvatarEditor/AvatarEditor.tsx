import { Avatar, AvatarProps, PercentageOffsets } from 'components/ui';
import { useEffect, useRef, useState } from 'react';
import {
  filter,
  fromEvent,
  map,
  merge,
  mergeMapTo,
  Observable,
  pairwise,
  scan,
  takeUntil,
  tap,
} from 'rxjs';
import styled from '@emotion/styled';

export const AVATAR_SIZE = 200;

const coordinatesFromMouseEvent = (element: HTMLElement) => (mouseEventName: string) =>
  fromEvent(element, mouseEventName).pipe(
    filter((event: Event): event is MouseEvent => event instanceof MouseEvent),
    map((event: MouseEvent) => ({
      x: event.clientX,
      y: event.clientY,
    }))
  );

const getPercentageOffset = (initial: number, delta: number) => {
  console.log(initial, delta);
  const offsetPercentage = initial + delta;
  if (offsetPercentage <= 0) {
    return 0;
  }

  if (offsetPercentage >= 100) {
    return 100;
  }

  return offsetPercentage;
};

type DeltaCoordinates = PercentageOffsets;

const getObjectPosition = (
  avatarElement: HTMLDivElement,
  [initialX, initialY]: PercentageOffsets
) => {
  const [mouseDownCoordinates$, mouseMoveCoordinates$] = ['mousedown', 'mousemove'].map(
    coordinatesFromMouseEvent(avatarElement)
  );
  const [mouseUp$, mouseOut$] = ['mouseup', 'mouseout'].map((mouseEventName) =>
    fromEvent(avatarElement, mouseEventName)
  );

  const imageElement = avatarElement.querySelector('img');

  if (imageElement === null) {
    throw Error('avatarElement must contain an img element.');
  }

  const { naturalWidth: imageWidth, naturalHeight: imageHeight } = imageElement;
  const isImageLandscape = imageWidth > imageHeight;
  const scaledWidth = isImageLandscape ? (imageWidth / imageHeight) * AVATAR_SIZE : AVATAR_SIZE;
  const scaledHeight = isImageLandscape ? AVATAR_SIZE : (imageHeight / imageWidth) * AVATAR_SIZE;

  return mouseDownCoordinates$.pipe(
    mergeMapTo(
      mouseMoveCoordinates$.pipe(
        pairwise(),
        map(
          ([previousCoordinates, currentCoordinates]): DeltaCoordinates => [
            currentCoordinates.x - previousCoordinates.x,
            currentCoordinates.y - previousCoordinates.y,
          ]
        ),
        map(
          ([deltaX, deltaY]): PercentageOffsets => [
            isImageLandscape ? (deltaX / scaledWidth) * -100 : 0,
            isImageLandscape ? 0 : (deltaY / scaledHeight) * -100,
          ]
        ),
        takeUntil(merge(mouseUp$, mouseOut$))
      )
    ),
    scan<PercentageOffsets, DeltaCoordinates>(
      ([x, y], [deltaX, deltaY]) => [
        getPercentageOffset(x, deltaX),
        getPercentageOffset(y, deltaY),
      ],
      [initialX, initialY]
    )
  );
};

const Slider = styled.input`
  &:hover {
    cursor: pointer;
  }
`;

type AvatarEditorProps = Pick<AvatarProps, 'percentageOffsets'>;

export const AvatarEditor = ({ percentageOffsets: [offsetX, offsetY] }: AvatarEditorProps) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [[x, y], objectPosition] = useState<PercentageOffsets>([offsetX, offsetY]);

  useEffect(() => {
    if (avatarRef.current) {
      getObjectPosition(avatarRef.current, [x, y]).subscribe(objectPosition);
    }
  }, []);

  return (
    <div>
      <Avatar size={AVATAR_SIZE} percentageOffsets={[x, y]} ref={avatarRef} />
      <Slider type="range" />
    </div>
  );
};
