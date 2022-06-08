import { useEffect } from 'react';
import {
  getIdToken$,
  useIsAuthenticated,
  useIsLoggingIn,
  useLogout,
} from 'libraries/authentication';
import { filter } from 'rxjs';
import { fromMetaMaskEvent, isMetaMaskInjected } from 'libraries/blockchain';

export const LogoutManager = () => {
  const logout = useLogout();
  const isAuthenticated = useIsAuthenticated();
  // logic to log user out when the authentication token changes
  useEffect(() => {
    const subscription = getIdToken$()
      .pipe(
        // check if token from cookies isn't undefined since
        filter((token) => token === null && isAuthenticated)
      )
      .subscribe(logout);
    return () => subscription.unsubscribe();
  }, [logout, isAuthenticated]);

  const [isLoggingIn] = useIsLoggingIn();

  // logic to ensure the user is logged out when the account changes on metamask
  useEffect(() => {
    if (isMetaMaskInjected()) {
      const subscription = fromMetaMaskEvent('accountsChanged').subscribe(() => {
        if (!isLoggingIn) {
          // page reload required to prevent accountsChanged event from firing after being auto-logged out and logging into another account and using metamask
          logout().then(() => window.location.reload());
        }
      });

      return () => subscription.unsubscribe();
    }
  }, [isLoggingIn, logout]);

  return <></>;
};
