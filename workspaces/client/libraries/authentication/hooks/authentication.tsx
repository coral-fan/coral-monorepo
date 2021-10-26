import useAuthenticationContext from './context';

export const useAuthentication = () => {
  const { isAuthenticated, setIsAuthenticated } = useAuthenticationContext();

  return [isAuthenticated, setIsAuthenticated];
};
