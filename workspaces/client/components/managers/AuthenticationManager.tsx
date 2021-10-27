import { getAuth } from '@firebase/auth';
import { useEffect, useState } from 'react';
import { useLogout } from 'libraries/authentication/hooks';
import { fromEvent, merge } from 'rxjs';
import { useGetChainIdChanged$ } from 'libraries/blockchain/hooks/metamask';

export default function AuthenticationManager() {
  const logout = useLogout();
  const getChainIdChanged$ = useGetChainIdChanged$();

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // logic to log user out when the authentication token changes
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user && !isLoggingOut) {
        setIsLoggingOut(true);
        await logout();
        setIsLoggingOut(false);
      }
    });
  }, [isLoggingOut, setIsLoggingOut, logout]);

  // logic to ensure the user is logged out when the account changes on metamask
  useEffect(() => {
    if (window.ethereum) {
      const subscription = merge(
        /* eslint @typescript-eslint/no-explicit-any: 'off' -- window.ethereum must be coerced as any so that fromEvent will accept the value as a EventEmitter. */
        fromEvent(window.ethereum as any, 'accountsChanged')
      ).subscribe(logout);

      return () => subscription.unsubscribe();
    }
  }, [getChainIdChanged$, logout]);

  return <></>;
}
