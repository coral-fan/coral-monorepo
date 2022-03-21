import { useWeb3 } from 'libraries/blockchain/hooks';
import { getAuth } from 'firebase/auth';
import { useIdToken } from '.';
import { useCallback } from 'react';
import { usePush } from './usePush';
import { useRouter } from 'next/router';

export const useLogout = () => {
  const currentRoute = useRouter().pathname;
  const push = usePush();
  const { active, connector } = useWeb3();
  const idToken = useIdToken();

  const logout = useCallback(async () => {
    if (active) {
      connector.deactivate();
    }
    if (idToken) {
      await getAuth().signOut();
    }
    if (currentRoute !== '/') {
      push('/');
    }
  }, [active, connector, idToken, currentRoute, push]);

  return logout;
};
