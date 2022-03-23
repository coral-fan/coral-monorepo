import { useWallet } from 'libraries/blockchain';
import { getAuth } from 'firebase/auth';
import { useIdToken } from '.';
import { useCallback } from 'react';

export const useLogout = () => {
  const { active, connector } = useWallet();
  const idToken = useIdToken();

  const logout = useCallback(async () => {
    if (active) {
      connector.deactivate();
    }
    if (idToken) {
      await getAuth().signOut();
    }
  }, [active, connector, idToken]);

  return logout;
};
