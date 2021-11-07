import { useWeb3 } from '../../blockchain/hooks';
import { getAuth } from 'firebase/auth';
import { destroyCookie, parseCookies } from 'nookies';
import { COOKIE_OPTIONS } from 'consts';
import { useIsTokenAuthenticated } from '.';

export const useLogout = () => {
  const { active, deactivate } = useWeb3();
  const { token } = parseCookies();
  const [, setIsTokenAuthenticated] = useIsTokenAuthenticated();

  return async function logout() {
    if (active) {
      deactivate();
    }
    if (token) {
      await getAuth().signOut();
      destroyCookie(undefined, 'token', COOKIE_OPTIONS);
      setIsTokenAuthenticated(false);
    }
  };
};
