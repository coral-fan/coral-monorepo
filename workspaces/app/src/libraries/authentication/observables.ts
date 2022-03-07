import { getAuth } from 'firebase/auth';
import { authState, idToken } from 'rxfire/auth';
import { filter } from 'rxjs';

export const getIdToken$ = () => {
  const auth = getAuth();
  return idToken(auth);
};

export const getLoggedIn$ = () => {
  const auth = getAuth();
  return authState(auth).pipe(filter((user) => !!user));
};
