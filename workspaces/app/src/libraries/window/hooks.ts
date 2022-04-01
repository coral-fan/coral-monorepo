import { useObservable } from 'libraries/utils';
import { fromEvent, map } from 'rxjs';
import { BREAKPOINT } from 'styles';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export const useWindowDimensions = () => {
  const resizeWindow$ = fromEvent(window, 'resize');
  const getWindowDimensions$ = () => resizeWindow$.pipe(map(getWindowDimensions));

  return useObservable(getWindowDimensions$, getWindowDimensions());
};

export const useIsDesktop = () => {
  const { width } = useWindowDimensions();
  return width >= BREAKPOINT.LAPTOP_MIN;
};

export const useIsMobile = () => {
  const { width } = useWindowDimensions();
  return width <= BREAKPOINT.TABLET_MIN;
};
