import { Avatar } from 'components/ui';
import { useEffect, useRef, useState } from 'react';
import { filter, fromEvent, map, mergeMapTo, pairwise, pipe, scan, takeUntil } from 'rxjs';
import { Draggable } from 'components/ui/profile/Avatar/types';
import styled from '@emotion/styled';

type DraggableAvatarProps = Draggable;

const Wrapper = styled.div`
  &:hover {
    cursor: move;
  }
`;

const coordinatesFromMouseEvent = (element: HTMLElement) => (mouseEventName: string) =>
  fromEvent(element, mouseEventName).pipe(
    filter((event: Event): event is MouseEvent => event instanceof MouseEvent),
    pipe(
      map((event: MouseEvent) => ({
        x: event.clientX,
        y: event.clientY,
      }))
    )
  );

type Coordinates = [number, number];

const getOffsetCoordinates = (
  element: HTMLElement,
  [initialX, initialY]: Coordinates,
  imageElement: HTMLElement
) => {
  const [mouseDownCoordinates$, mouseMoveCoordinates$] = ['mousedown', 'mousemove'].map(
    coordinatesFromMouseEvent(element)
  );
  const mouseUp$ = fromEvent(element, 'mouseup');

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
        takeUntil(mouseUp$)
      )
    ),
    scan<Coordinates, Coordinates>(
      ([xOffset, yOffset], [xDiff, yDiff]) => [xOffset + xDiff, yOffset + yDiff],
      [initialX, initialY]
    )
  );
};

export const DraggableAvatar = ({ xOffset = 0, yOffset = 0 }: Draggable = {}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [[x, y], setCoordinates] = useState<Coordinates>([xOffset, yOffset]);

  useEffect(() => {
    if (wrapperRef.current) {
      const imageElement = wrapperRef.current.querySelector('img');

      if (imageElement === null) {
        throw Error('An imageElement should not be null.');
      }

      getOffsetCoordinates(wrapperRef.current, [xOffset, yOffset], imageElement).subscribe(
        setCoordinates
      );
    }
  }, []);

  return (
    <Wrapper ref={wrapperRef}>
      <Avatar size={200} hasBorder={true} xOffset={x} yOffset={y} />
    </Wrapper>
  );
};
