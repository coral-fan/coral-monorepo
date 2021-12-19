import { useEffect } from 'react';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { useWeb3 } from 'libraries/blockchain/hooks';
import {
  useIsTokenAuthenticated,
  useIsAuthenticated,
  useIsLoggingIn,
} from 'libraries/authentication/hooks';

const getIsAuthenticated = (isTokenAuthenticated: boolean, isConnectorActive: boolean) =>
  isTokenAuthenticated && isConnectorActive;

export const AuthenticationManager = () => {
  const [isTokenAuthenticated] = useIsTokenAuthenticated();
  const { active } = useWeb3();

  const [, setIsAuthenticated] = useIsAuthenticated();

  useEffect(() => {
    setIsAuthenticated(getIsAuthenticated(isTokenAuthenticated, active));
  }, [setIsAuthenticated, isTokenAuthenticated, active]);

  const [, setIsLoggingIn] = useIsLoggingIn();

  useEffect(() => {
    if (sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) {
      setIsLoggingIn(true);
    }
  }, [setIsLoggingIn]);

  return <></>;
};
