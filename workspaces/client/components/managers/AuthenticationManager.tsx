import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { useLogout } from 'library/hooks/authentication';
import { fromEvent } from 'rxjs';

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
      const target = ethereum as any;

      const accountsChanged$ = fromEvent(target, 'accountsChanged');
      const chainChanged$ = fromEvent(target, 'chainChanged');

      const accountsChangedSubscription = accountsChanged$.subscribe(logout);
      const chainChangedSubscription = chainChanged$.subscribe(logout);

      return () =>
        [accountsChangedSubscription, chainChangedSubscription].forEach((subscription) =>
          subscription.unsubscribe()
        );
    }
  }, []);

  return children;
}
