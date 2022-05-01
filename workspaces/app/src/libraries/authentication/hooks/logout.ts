import { useWallet } from 'libraries/blockchain';
import { getAuth } from 'firebase/auth';
import { useIdToken } from '.';
import { useCallback } from 'react';

export const useLogout = () => {
  const { isActive, connector, setConnectorType } = useWallet();
  const idToken = useIdToken();

  // TODO: check if conditional checks matter for logging out actions (deactivate, signout, etc)
  const logout = useCallback(async () => {
    if (isActive) {
      await connector.deactivate();
      setConnectorType(undefined);
    }
    if (idToken) {
      await getAuth().signOut();
    }
  }, [isActive, connector, setConnectorType, idToken]);

  return logout;
};
