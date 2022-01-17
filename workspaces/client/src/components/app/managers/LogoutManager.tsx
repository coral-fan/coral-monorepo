import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { useLogout } from 'libraries/authentication/hooks';
import { fromEvent } from 'rxjs';

export const LogoutManager = () => {
  const logout = useLogout();
  // logic to log user out when the authentication token changes
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      // checks if user is not null
      if (!user) {
        logout();
      }
    });
  }, [logout]);

  // logic to ensure the user is logged out when the account changes on metamask
  useEffect(() => {
    if (window.ethereum && window.ethereum.addListener) {
      const subscription = fromEvent(window.ethereum, 'accountsChanged').subscribe(logout);

      return () => subscription.unsubscribe();
    }
  }, [logout]);

  return <></>;
};
