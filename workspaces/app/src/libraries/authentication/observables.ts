import { getAuth } from 'firebase/auth';
import { idToken } from 'rxfire/auth';

export const getToken$ = () => {
  const auth = getAuth();
  return idToken(auth);
};
