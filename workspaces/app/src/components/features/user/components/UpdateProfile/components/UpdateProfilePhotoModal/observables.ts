import { PercentageOffsets } from 'components/ui';
import { filter, fromEvent, map, merge, mergeMapTo, pairwise, scan, takeUntil, tap } from 'rxjs';
import { PREVIEW_SIZE } from './consts';

const coordinatesFromMouseEvent = (element: HTMLElement) => (mouseEventName: string) =>
  fromEvent(element, mouseEventName).pipe(
    filter((event: Event): event is MouseEvent => event instanceof MouseEvent),
    map((event: MouseEvent) => ({
      x: event.clientX,
      y: event.clientY,
    }))
  );
const getPercentageOffset = (initial: number, delta: number) => {
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

export const getObjectPosition = (
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
  const scaledWidth = isImageLandscape ? (imageWidth / imageHeight) * PREVIEW_SIZE : PREVIEW_SIZE;
  const scaledHeight = isImageLandscape ? PREVIEW_SIZE : (imageHeight / imageWidth) * PREVIEW_SIZE;

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
            (deltaX / scaledWidth) * -100,
            (deltaY / scaledHeight) * -100,
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
