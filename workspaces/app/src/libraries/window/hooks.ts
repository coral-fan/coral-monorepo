import { useObservable } from 'libraries/utils';
import { fromEvent, map } from 'rxjs';
import { DESKTOP_BREAKPOINT } from 'styles';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

export const useWindowDimensions = () => {
  const resizeWindow$ = fromEvent(window, 'resize');
  const getWindowDimensions$ = () => resizeWindow$.pipe(map(() => getWindowDimensions()));

  return useObservable(getWindowDimensions$, getWindowDimensions());
};

export const useIsDesktop = () => {
  const { width } = useWindowDimensions();
  return width >= parseInt(DESKTOP_BREAKPOINT.slice(0, -2));
};
