import useWeb3 from '../web3';
import { getAuth } from 'firebase/auth';
import { destroyCookie, parseCookies } from 'nookies';
import { useAuthentication } from 'libraries/providers/authentication';

export const useLogout = () => {
  const { active, deactivate } = useWeb3();
  const { token } = parseCookies();
  const { setIsAuthenticated } = useAuthentication();
  return async () => {
    if (active) {
      deactivate();
    }
    if (token) {
      destroyCookie(undefined, 'token');
      await getAuth().signOut();
    }

    setIsAuthenticated(false);
  };
};
