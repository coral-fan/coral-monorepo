import useAuthenticationContext from './context';

export const useIsTokenAuthenticated = () => {
  const { isTokenAuthenticated, setIsTokenAuthenticated } = useAuthenticationContext();

  return [isTokenAuthenticated, setIsTokenAuthenticated];
};
