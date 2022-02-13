import { useObservable } from 'libraries/utils/hooks';
import { useMemo } from 'react';
import { getToken$ } from '../observables';
import { getToken } from '../utils';

export const useToken = () => {
  const initialToken = useMemo(getToken, []);
  return useObservable<string | null>(getToken$, initialToken);
};
