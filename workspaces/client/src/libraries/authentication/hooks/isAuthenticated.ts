import { useWeb3 } from 'libraries/blockchain/hooks';
import { useIsSigningUp, useIsTokenAuthenticated } from '.';

export const useIsAuthenticated = () => {
  const { active } = useWeb3();
  const isTokenAuthenticated = useIsTokenAuthenticated();
  const [isSigningUp] = useIsSigningUp();

  return active && isTokenAuthenticated && !isSigningUp;
};
