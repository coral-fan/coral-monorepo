import { useObservable } from 'libraries/utils';
import { fromEvent, map } from 'rxjs';
import { QUERIES_WIDTH } from 'styles';

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
  return width >= QUERIES_WIDTH.laptopAndUp;
};

export const useIsMobile = () => {
  const { width } = useWindowDimensions();
  return width <= QUERIES_WIDTH.tabletAndUp;
};
