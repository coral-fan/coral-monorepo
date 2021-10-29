import useAuthenticationContext from './context';

export const useIsAuthenticated = () => {
  const { isAuthenticated } = useAuthenticationContext();

  return isAuthenticated;
};
