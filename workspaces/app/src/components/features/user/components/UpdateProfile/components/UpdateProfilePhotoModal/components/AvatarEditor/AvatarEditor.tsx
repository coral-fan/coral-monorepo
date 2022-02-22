import { Avatar } from 'components/ui';
import { useEffect, useRef, useState } from 'react';
import { filter, fromEvent, map, merge, mergeMapTo, pairwise, scan, takeUntil, tap } from 'rxjs';
import { Draggable } from 'components/ui/profile/Avatar/types';
import styled from '@emotion/styled';

export const AVATAR_SIZE = 200;

type DraggableAvatarProps = Draggable;

const Wrapper = styled.div`
  width: fit-content;

  &:hover {
    cursor: move;
  }
`;

const coordinatesFromMouseEvent = (element: HTMLElement) => (mouseEventName: string) =>
  fromEvent(element, mouseEventName).pipe(
    filter((event: Event): event is MouseEvent => event instanceof MouseEvent),
    map((event: MouseEvent) => ({
      x: event.clientX,
      y: event.clientY,
    }))
  );

type Coordinates = [number, number];

const getBoundedCoordinate = (initial: number, delta: number, length: number) => {
  const coordinate = initial + delta;
  if (coordinate > 0) {
    return 0;
  }
  const maxOffset = (length - AVATAR_SIZE) * -1;

  if (coordinate < maxOffset) {
    return maxOffset;
  }

  return coordinate;
};

const getObjectPosition = (
  element: HTMLElement,
  [initialX, initialY]: Coordinates,
  imageElement: HTMLImageElement
) => {
  const [mouseDownCoordinates$, mouseMoveCoordinates$] = ['mousedown', 'mousemove'].map(
    coordinatesFromMouseEvent(element)
  );
  const [mouseUp$, mouseOut$] = ['mouseup', 'mouseout'].map((mouseEventName) =>
    fromEvent(element, mouseEventName)
  );

  return mouseDownCoordinates$.pipe(
    mergeMapTo(
      mouseMoveCoordinates$.pipe(
        pairwise(),
        map(
          ([previousCoordinates, currentCoordinates]): Coordinates => [
            currentCoordinates.x - previousCoordinates.x,
            currentCoordinates.y - previousCoordinates.y,
          ]
        ),
        takeUntil(merge(mouseUp$, mouseOut$))
      )
    ),
    scan<Coordinates, Coordinates>(
      ([x, y], [deltaX, deltaY]) => [
        getBoundedCoordinate(x, deltaX, imageElement.naturalWidth),
        getBoundedCoordinate(y, deltaY, imageElement.naturalHeight),
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

export const AvatarEditor = ({ xOffset = 0, yOffset = 0 }: Draggable = {}) => {
  const avatarRef = useRef<HTMLDivElement>(null);
  const [[x, y], objectPosition] = useState<Coordinates>([xOffset, yOffset]);

  useEffect(() => {
    if (avatarRef.current) {
      const imageElement = avatarRef.current.querySelector('img');

      if (imageElement === null) {
        throw Error('imageElement should not be null.');
      }

      getObjectPosition(avatarRef.current, [xOffset, yOffset], imageElement).subscribe(
        objectPosition
      );
    }
  }, []);

  return (
    <div>
      <Avatar size={AVATAR_SIZE} hasBorder={false} xOffset={x} yOffset={y} ref={avatarRef} />
      <Slider type="range" />
    </div>
  );
};
