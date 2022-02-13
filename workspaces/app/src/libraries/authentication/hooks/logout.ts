import { useWeb3 } from 'libraries/blockchain/hooks';
import { getAuth } from 'firebase/auth';
import { useToken } from '.';
import { useCallback } from 'react';

export const useLogout = () => {
  const { active, deactivate } = useWeb3();
  const token = useToken();

  const logout = useCallback(async () => {
    if (active) {
      deactivate();
    }
    if (token) {
      await getAuth().signOut();
    }
  }, [active, deactivate, token]);

  return logout;
};
