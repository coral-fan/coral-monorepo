import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { useLogout } from 'library/hooks/authentication';
import { fromEvent } from 'rxjs';
import { getChainId$ } from 'library/observables/metamask';

interface props {
  children: JSX.Element;
}

export default function AuthenticationManager({ children }: props) {
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

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      const chainId$ = getChainId$();
      const target = ethereum as any;

      const accounts$ = fromEvent(target, 'accountsChanged');

      const accountsSubscription = accounts$.subscribe(logout);
      const chainIdSubscription = chainId$.subscribe(logout);

      return () =>
        [accountsSubscription, chainIdSubscription].forEach((subscription) =>
          subscription.unsubscribe()
        );
    }
  }, []);

  return children;
}
