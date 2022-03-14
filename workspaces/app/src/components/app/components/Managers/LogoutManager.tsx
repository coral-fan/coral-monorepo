import { useEffect } from 'react';
import { getIdToken$, useLogout } from 'libraries/authentication';
import { filter } from 'rxjs';
import { fromEthereumEvent, isMetaMaskInjected } from 'libraries/blockchain';

export const LogoutManager = () => {
  const logout = useLogout();
  // logic to log user out when the authentication token changes
  useEffect(() => {
    const subscription = getIdToken$()
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
      const subscription = fromEthereumEvent('accountsChanged').subscribe(logout);

      return () => subscription.unsubscribe();
    }
  }, [logout]);

  return <></>;
};
