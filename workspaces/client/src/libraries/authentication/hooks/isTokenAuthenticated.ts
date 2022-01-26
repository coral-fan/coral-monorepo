import { useObservable } from 'libraries/utils/hooks';
import { distinctUntilChanged, interval, map, startWith } from 'rxjs';
import { getToken } from '../utils';

const getToken$ = () => {
  return interval(250).pipe(startWith(getToken()), map(getToken), distinctUntilChanged());
};

export const useToken = () => useObservable<string | undefined>(getToken$, getToken());

export const useIsTokenAuthenticated = () => {
  const token = useToken();
  return token !== undefined;
};
