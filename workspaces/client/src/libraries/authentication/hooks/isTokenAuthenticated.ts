import { useObservable } from 'libraries/utils/hooks';
import { useMemo } from 'react';
import { distinctUntilChanged, interval, map } from 'rxjs';
import { getToken } from '../utils';

const getToken$ = () => {
  return interval(250).pipe(map(getToken), distinctUntilChanged());
};

export const useToken = () => {
  const initialToken = useMemo(() => getToken(), []);
  return useObservable<string | undefined>(getToken$, initialToken);
};

export const useIsTokenAuthenticated = () => {
  const token = useToken();
  return token !== undefined;
};
