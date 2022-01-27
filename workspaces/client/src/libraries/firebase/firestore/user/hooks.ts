import { getAuth } from 'firebase/auth';
import { useObservable } from 'libraries/utils/hooks';
import { getUserUid$ } from './observables';

const getUserUid = () => getAuth().currentUser?.uid;

export const useUserUid = () => useObservable(getUserUid$, getUserUid());
