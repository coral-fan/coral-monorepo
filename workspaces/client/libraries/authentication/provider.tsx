import { createContext, FC, useEffect, useState } from 'react';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { useWeb3 } from 'libraries/blockchain/hooks';

export interface AuthenticationProviderProps {
  tokenAuthenticated: boolean;
}
interface AuthenticationContext {
  isTokenAuthenticated: boolean;
  setIsTokenAuthenticated: (tokenAuthenticated: boolean) => void;
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  setIsLoggingIn: (isLoggingIn: boolean) => void;
}

const getIsAuthenticated = (isTokenAuthenticated: boolean, isConnectorActive: boolean) =>
  isTokenAuthenticated && isConnectorActive;

export const AuthenticationContext = createContext<undefined | AuthenticationContext>(undefined);
export const AuthenticationProvider: FC<AuthenticationProviderProps> = ({
  tokenAuthenticated,
  children,
}) => {
  const [isTokenAuthenticated, setIsTokenAuthenticated] = useState(tokenAuthenticated);
  const { active } = useWeb3();
  const [isAuthenticated, setIsAuthenticated] = useState(
    getIsAuthenticated(isTokenAuthenticated, active)
  );

  useEffect(() => {
    setIsAuthenticated(getIsAuthenticated(isTokenAuthenticated, active));
  }, [isTokenAuthenticated, active]);

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) {
      setIsLoggingIn(true);
    }
  }, [setIsLoggingIn]);

  return (
    <AuthenticationContext.Provider
      value={{
        isTokenAuthenticated,
        setIsTokenAuthenticated,
        isAuthenticated,
        isLoggingIn,
        setIsLoggingIn,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
