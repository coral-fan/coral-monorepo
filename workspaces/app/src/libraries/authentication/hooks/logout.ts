import { useWallet } from 'libraries/blockchain';
import { getAuth } from 'firebase/auth';
import { useIdToken } from '.';
import { useCallback } from 'react';

export const useLogout = () => {
  const { isActive, connector } = useWallet();
  const idToken = useIdToken();

  const logout = useCallback(async () => {
    if (isActive) {
      connector.deactivate();
    }
    if (idToken) {
      await getAuth().signOut();
    }
  }, [isActive, connector, idToken]);

  return logout;
};
