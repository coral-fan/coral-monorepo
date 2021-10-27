import useAuthenticationContext from './context';

export const useIsAuthenticated = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthenticationContext();

  return [isAuthenticated, setIsAuthenticated];
};
