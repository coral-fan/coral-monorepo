import { useWeb3 } from 'libraries/blockchain/hooks';
import { getAuth } from 'firebase/auth';
import { destroyCookie } from 'nookies';
import { COOKIE_OPTIONS } from 'consts';
import { useIsSigningUp, useToken } from '.';
import { useCallback } from 'react';

export const useLogout = () => {
  const { active, deactivate } = useWeb3();
  const token = useToken();
  const [isSigningUp, setIsSigningUp] = useIsSigningUp();

  const logout = useCallback(async () => {
    if (active) {
      deactivate();
    }
    if (token) {
      destroyCookie(undefined, 'token', COOKIE_OPTIONS);
      await getAuth().signOut();
    }

    if (isSigningUp) {
      setIsSigningUp(false);
    }
  }, [active, deactivate, token, isSigningUp, setIsSigningUp]);

  return logout;
};
