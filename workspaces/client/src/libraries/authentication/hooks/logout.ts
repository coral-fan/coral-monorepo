import { useWeb3 } from '../../blockchain/hooks';
import { getAuth } from 'firebase/auth';
import { destroyCookie, parseCookies } from 'nookies';
import { COOKIE_OPTIONS } from 'consts';

export const useLogout = () => {
  const { active, deactivate } = useWeb3();
  const { token } = parseCookies();

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
