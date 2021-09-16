import { getAuth } from '@firebase/auth';
import { useEffect } from 'react';
import { useLogout } from 'library/hooks/authentication';

interface props {
  children: JSX.Element;
}

export default function AuthenticationManager({ children }: props) {
  const logout = useLogout();

  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        logout();
      }
    });
  }, []);

  useEffect(() => {
    const { ethereum } = window;
    if (ethereum?.on) {
      ethereum.on('accountsChanged', logout);
      ethereum.on('chainChanged', logout);

      if (ethereum.removeEventListener) {
        return () => {
          console.info('event listener removed');
          ethereum.removeEventListener('accountsChanged', logout);
          ethereum.removeEventListener('chainChanged', logout);
        };
      }
    }
  }, []);

  return children;
}
