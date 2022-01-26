import { getAuth } from 'firebase/auth';
import { user } from 'rxfire/auth';
import { map } from 'rxjs';

const getFirebaseUser$ = () => {
  const auth = getAuth();
  return user(auth);
};

export const getUserUid$ = () => getFirebaseUser$().pipe(map((user) => user?.uid));
