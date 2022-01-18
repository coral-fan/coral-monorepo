import { useWeb3 } from 'libraries/blockchain';
import { useIsLoggingIn, useIsSigningUp, useIsTokenAuthenticated } from '.';

export const useIsAuthenticated = () => {
  const { active } = useWeb3();
  const isTokenAuthenticated = useIsTokenAuthenticated();
  const [isSigningUp] = useIsSigningUp();
  const [isLoggingIn] = useIsLoggingIn();

  return active && isTokenAuthenticated && !isSigningUp && !isLoggingIn;
};
