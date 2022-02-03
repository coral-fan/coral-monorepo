import { getAuth } from 'firebase/auth';
import { useObservable } from 'libraries/utils/hooks';
import { useMemo } from 'react';
import { getUsernames$, getUserUid$ } from './observables';

const getUserUid = () => getAuth().currentUser?.uid;

export const useUserUid = () => useObservable(getUserUid$, getUserUid());

export const useUsernames = () => {
  const initialUsernames = useMemo(() => new Set<string>(), []);
  return useObservable(getUsernames$, initialUsernames);
};
