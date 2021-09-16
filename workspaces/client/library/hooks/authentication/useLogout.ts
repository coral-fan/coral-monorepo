import { useRouter } from 'next/router';
import useWeb3 from '../web3';
import { getAuth } from 'firebase/auth';
import { destroyCookie, parseCookies } from 'nookies';
import { LOGIN_ROUTE } from 'consts';

export const useLogout = () => {
  const { active, deactivate } = useWeb3();
  const router = useRouter();
  const { token } = parseCookies();
  return async () => {
    if (active) {
      deactivate();
    }
    if (token) {
      destroyCookie(undefined, 'token');
      await getAuth().signOut();
    }
    /* check if current route is for login before performing Firebase & cookie authentication related clean up logic
       this is necessary because the logout function is also used for MetaMask account/network change events
    */
    if (router.route !== LOGIN_ROUTE) {
      router.push(LOGIN_ROUTE);
    }
  };
};
