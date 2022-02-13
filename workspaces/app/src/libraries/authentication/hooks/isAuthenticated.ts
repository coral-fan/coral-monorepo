import { useIsLoggingIn, useIsSigningUp, useIdToken } from '.';

export const useIsAuthenticated = () => {
  const idToken = useIdToken();
  const [isSigningUp] = useIsSigningUp();
  const [isLoggingIn] = useIsLoggingIn();

  return idToken !== null && !isSigningUp && !isLoggingIn;
};
