import { useWeb3 } from 'libraries/blockchain/hooks';
import { getAuth } from 'firebase/auth';
import { destroyCookie } from 'nookies';
import { COOKIE_OPTIONS } from 'consts';
import { useToken } from '.';

export const useLogout = () => {
  const { active, deactivate } = useWeb3();
  const token = useToken();

  return async function logout() {
    if (active) {
      deactivate();
    }
    if (token) {
      destroyCookie(undefined, 'token', COOKIE_OPTIONS);
      await getAuth().signOut();
    }
  };
};
