import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { getToken, useLogout } from 'libraries/authentication';
import { filter, fromEvent, map } from 'rxjs';
import { idToken } from 'rxfire/auth';

export const LogoutManager = () => {
  const logout = useLogout();
  // logic to log user out when the authentication token changes
  useEffect(() => {
    const tokenFromCookies = getToken();
    const subscription = idToken(getAuth())
      .pipe(
        map((token) => token ?? undefined),
        filter((token) => token !== tokenFromCookies)
      )
      .subscribe(logout);

    return () => subscription.unsubscribe();
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
