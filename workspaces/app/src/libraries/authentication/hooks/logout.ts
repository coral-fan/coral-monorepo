import { useWeb3 } from 'libraries/blockchain/hooks';
import { getAuth } from 'firebase/auth';
import { useIdToken } from '.';
import { useCallback } from 'react';
import { usePush } from './usePush';

export const useLogout = () => {
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
    push('/');
  }, [active, connector, idToken, push]);

  return logout;
};
