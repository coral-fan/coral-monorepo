import { getAuth } from 'firebase/auth';
import { useObservable } from 'libraries/utils/hooks';
import { useMemo } from 'react';
import { idToken } from 'rxfire/auth';
import { getToken } from '../utils';

export const getToken$ = () => {
  const auth = getAuth();
  return idToken(auth);
};

export const useToken = () => {
  const initialToken = useMemo(() => getToken(), []);
  return useObservable<string | null>(getToken$, initialToken);
};

export const useIsTokenAuthenticated = () => {
  const token = useToken();
  return token !== null;
};
