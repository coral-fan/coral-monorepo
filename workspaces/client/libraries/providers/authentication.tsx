import { createContext, FC, useContext, useState } from 'react';

const AuthenticationContext = createContext({
  isAuthenticated: false,
  /* eslint @typescript-eslint/no-unused-vars:off -- dummy function used for typing via inference */
  setIsAuthenticated: (authenticated: boolean) => {
    return;
  },
});

export const AuthenticationProvider: FC<{ authenticated: boolean }> = ({
  authenticated,
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(authenticated);

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => useContext(AuthenticationContext);
