import { getAuth } from 'firebase/auth';
import { idToken } from 'rxfire/auth';

export const getIdToken$ = () => {
  const auth = getAuth();
  return idToken(auth);
};
