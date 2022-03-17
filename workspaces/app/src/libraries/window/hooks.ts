import { useObservable } from 'libraries/utils';
import { fromEvent, map } from 'rxjs';
import { DESKTOP_BREAKPOINT_WIDTH } from 'styles';

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
  return width >= DESKTOP_BREAKPOINT_WIDTH;
};
