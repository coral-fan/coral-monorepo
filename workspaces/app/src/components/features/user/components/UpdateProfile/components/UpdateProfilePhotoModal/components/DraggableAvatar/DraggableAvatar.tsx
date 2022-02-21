import { Avatar } from 'components/ui';
import { useEffect, useRef } from 'react';
import { filter, fromEvent, map, pipe, zip } from 'rxjs';
import { Draggable } from 'components/ui/profile/Avatar/types';
import styled from '@emotion/styled';

type DraggableAvatarProps = Draggable;
const Wrapper = styled.div`
  &:hover {
    cursor: move;
  }
`;
const coordinatesFromMouseEvent = (element: HTMLElement, mouseEventName: 'mousedown' | 'mouseup') =>
  fromEvent(element, mouseEventName).pipe(
    filter((event: Event): event is MouseEvent => event instanceof MouseEvent),
    pipe(
      map((event: MouseEvent) => ({
        x: event.clientX,
        y: event.clientY,
      }))
    )
  );
export const DraggableAvatar = ({ xOffset = 0, yOffset = 0 }: Draggable = {}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const mouseDownCoordinates$ = coordinatesFromMouseEvent(ref.current, 'mousedown');
      const mouseUpCoordinates$ = coordinatesFromMouseEvent(ref.current, 'mouseup');

      zip(mouseDownCoordinates$, mouseUpCoordinates$).subscribe(console.log);
    }
  }, []);

  return (
    <Wrapper ref={ref}>
      <Avatar size={200} hasBorder={true} />
    </Wrapper>
  );
};
