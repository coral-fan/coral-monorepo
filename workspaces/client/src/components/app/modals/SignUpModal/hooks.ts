import { getAuth } from 'firebase/auth';
import { useObservable } from 'libraries/utils/hooks';
import { user } from 'rxfire/auth';
import { map } from 'rxjs';

const getFirebaseUser$ = () => {
  const auth = getAuth();
  return user(auth);
};

const getUserUid$ = () => getFirebaseUser$().pipe(map((user) => user?.uid));

const getUserUid = () => getAuth().currentUser?.uid;

export const useUserUid = () => useObservable(getUserUid$, getUserUid());
