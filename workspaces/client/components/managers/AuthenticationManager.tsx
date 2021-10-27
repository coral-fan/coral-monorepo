import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { useLogout } from 'libraries/authentication/hooks';
import { fromEvent, merge } from 'rxjs';
import { useGetChainIdChanged$ } from 'libraries/blockchain/hooks/metamask';

export default function AuthenticationManager() {
  const logout = useLogout();
  const getChainIdChanged$ = useGetChainIdChanged$();

  useEffect(() => {
    let isLoggingOut = false;
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user && !isLoggingOut) {
        isLoggingOut = true;
        await logout();
        isLoggingOut = false;
      }
    });
  }, [logout]);

  useEffect(() => {
    if (window.ethereum) {
      const subscription = merge(
        getChainIdChanged$(),
        /* eslint @typescript-eslint/no-explicit-any: 'off' -- window.ethereum must be coerced as any so that fromEvent will accept the value as a EventEmitter. */
        fromEvent(window.ethereum as any, 'accountsChanged')
      ).subscribe(logout);

      return () => subscription.unsubscribe();
    }
  }, [getChainIdChanged$, logout]);

  return <></>;
}
