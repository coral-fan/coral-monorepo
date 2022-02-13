import { useObservable } from 'libraries/utils/hooks';
import { useMemo } from 'react';
import { getIdToken$ } from '../observables';
import { getIdToken } from '../utils';

export const useIdToken = () => {
  const initialToken = useMemo(getIdToken, []);
  return useObservable<string | null>(getIdToken$, initialToken);
};
