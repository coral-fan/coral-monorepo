import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { useIsTokenAuthenticated, useLogout } from 'libraries/authentication/hooks';
import { fromEvent } from 'rxjs';

export const LogoutManager = () => {
  const [isTokenAuthenticated] = useIsTokenAuthenticated();
  const logout = useLogout();
  // logic to log user out when the authentication token changes
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user && isTokenAuthenticated) {
        await logout();
      }
    });
  }, [isTokenAuthenticated, logout]);

  // logic to ensure the user is logged out when the account changes on metamask
  useEffect(() => {
    if (window.ethereum && window.ethereum.addListener) {
      const subscription = fromEvent(window.ethereum, 'accountsChanged').subscribe(logout);

      return () => subscription.unsubscribe();
    }
  }, [logout]);

  return <></>;
};
