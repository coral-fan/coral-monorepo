import { useObservable } from 'libraries/utils/hooks';
import { parseCookies } from 'nookies';
import { filter, interval, map, startWith, tap } from 'rxjs';

export const getToken = () => parseCookies().token;

export const getToken$ = (initialToken?: string) => {
  const tokenRef = { current: initialToken };
  return interval(500).pipe(
    startWith(getToken()),
    map(getToken),
    filter((token) => token !== tokenRef.current),
    tap((token) => (tokenRef.current = token))
  );
};

export const useToken = () => useObservable<string | undefined>(getToken$, getToken());

export const useIsTokenAuthenticated = () => {
  const token = useToken();
  return token !== undefined;
};
