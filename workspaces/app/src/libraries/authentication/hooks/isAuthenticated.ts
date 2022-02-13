import { useIsLoggingIn, useIsSigningUp, useToken } from '.';

export const useIsAuthenticated = () => {
  const token = useToken();
  const [isSigningUp] = useIsSigningUp();
  const [isLoggingIn] = useIsLoggingIn();

  return token !== null && !isSigningUp && !isLoggingIn;
};
