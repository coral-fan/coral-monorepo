import { getAuth } from 'firebase/auth';
import { user } from 'rxfire/auth';
import { map } from 'rxjs';

// client side only
const getFirebaseUser$ = () => {
  const auth = getAuth();
  return user(auth);
};

// client side only
export const getUserUid$ = () => getFirebaseUser$().pipe(map((user) => user?.uid));
