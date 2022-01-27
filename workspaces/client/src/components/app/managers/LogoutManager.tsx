import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { useLogout, useToken } from 'libraries/authentication';
import { filter, fromEvent, map } from 'rxjs';
import { idToken } from 'rxfire/auth';
import { getIsMetaMaskInjected } from 'libraries/blockchain';

export const LogoutManager = () => {
  const logout = useLogout();
  const tokenFromCookies = useToken();

  // logic to log user out when the authentication token changes
  useEffect(() => {
    const subscription = idToken(getAuth())
      .pipe(
        // need to map to undefined as the token from cookies will either be a string or undefined
        map((token) => token ?? undefined),
        filter((token) => tokenFromCookies === undefined || token !== tokenFromCookies)
      )
      .subscribe(logout);

    return () => subscription.unsubscribe();
  }, [tokenFromCookies, logout]);

  // logic to ensure the user is logged out when the account changes on metamask
  useEffect(() => {
    if (getIsMetaMaskInjected()) {
      const subscription = fromEvent(window.ethereum, 'accountsChanged').subscribe(logout);

      return () => subscription.unsubscribe();
    }
  }, [logout]);

  return <></>;
};
