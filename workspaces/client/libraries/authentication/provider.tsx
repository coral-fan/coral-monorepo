import { createContext, FC, useEffect, useState } from 'react';
import { IS_OPEN_LOGIN_PENDING } from 'consts';

interface AuthenticationContext {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  isLoggingIn: boolean;
  setIsLoggingIn: (isLoggingIn: boolean) => void;
}

export const AuthenticationContext = createContext<undefined | AuthenticationContext>(undefined);

export const AuthenticationProvider: FC<{ authenticated: boolean }> = ({
  authenticated,
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) {
      setIsLoggingIn(true);
    }
  }, [setIsLoggingIn]);

  return (
    <AuthenticationContext.Provider
      value={{ isAuthenticated, setIsAuthenticated, isLoggingIn, setIsLoggingIn }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
