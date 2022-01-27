import { useIsLoggingIn, useIsSigningUp, useIsTokenAuthenticated } from '.';

export const useIsAuthenticated = () => {
  const isTokenAuthenticated = useIsTokenAuthenticated();
  const [isSigningUp] = useIsSigningUp();
  const [isLoggingIn] = useIsLoggingIn();

  return isTokenAuthenticated && !isSigningUp && !isLoggingIn;
};
