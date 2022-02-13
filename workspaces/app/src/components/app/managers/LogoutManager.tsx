import { useEffect } from 'react';
import { getToken$, useLogout } from 'libraries/authentication';
import { filter, fromEvent } from 'rxjs';
import { isMetaMaskInjected } from 'libraries/blockchain';

export const LogoutManager = () => {
  const logout = useLogout();
  // logic to log user out when the authentication token changes
  useEffect(() => {
    const subscription = getToken$()
      .pipe(
        // check if token from cookies isn't undefined since
        filter((token) => token === null)
      )
      .subscribe(logout);

    return () => subscription.unsubscribe();
  }, [logout]);

  // logic to ensure the user is logged out when the account changes on metamask
  useEffect(() => {
    if (isMetaMaskInjected()) {
      const subscription = fromEvent(window.ethereum, 'accountsChanged').subscribe(logout);

      return () => subscription.unsubscribe();
    }
  }, [logout]);

  return <></>;
};
