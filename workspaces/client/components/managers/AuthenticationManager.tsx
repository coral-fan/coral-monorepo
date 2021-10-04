import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { useLogout } from 'library/hooks/authentication';
import { fromEvent } from 'rxjs';
import { getChainId$ } from 'library/observables/metamask';

export default function AuthenticationManager() {
  const logout = useLogout();

  useEffect(() => {
    let isLoggingOut = false;
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user && !isLoggingOut) {
        isLoggingOut = true;
        await logout();
        isLoggingOut = false;
      }
    });
  }, []);

  useEffect(
    () => {
      const { ethereum } = window;

      if (ethereum) {
        const chainId$ = getChainId$();
        /* eslint @typescript-eslint/no-explicit-any: 'off' -- window.ethereum must be coerced as any so that fromEvent will accept the value as a EventEmitter. */
        const target = ethereum as any;

        const accounts$ = fromEvent(target, 'accountsChanged');

        // TODO: not sure why I need to explictly invoke logout...need to look into this
        const accountsSubscription = accounts$.subscribe(() => logout());
        const chainIdSubscription = chainId$.subscribe(() => logout());

        return () =>
          [accountsSubscription, chainIdSubscription].forEach((subscription) =>
            subscription.unsubscribe()
          );
      }
    },
    /* eslint react-hooks/exhaustive-deps: 'off' -- logout will never change. */
    []
  );

  return <></>;
}
