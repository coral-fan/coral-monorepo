import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { getToken, useLogout } from 'libraries/authentication';
import { filter, fromEvent, map } from 'rxjs';
import { idToken } from 'rxfire/auth';
import { isMetaMaskInjected } from 'libraries/blockchain';

export const LogoutManager = () => {
  const logout = useLogout();
  // logic to log user out when the authentication token changes
  useEffect(() => {
    const subscription = idToken(getAuth())
      .pipe(
        // need to map to undefined as the token from cookies will either be a string or null
        map((token) => token ?? undefined),
        // check if token from cookies isn't undefined since
        filter((token) => token !== getToken())
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
