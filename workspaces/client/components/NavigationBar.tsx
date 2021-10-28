import { useEffect } from 'react';

import { Button } from './ui';
import { Flex } from './layout';

import { useIsAuthenticated, useLogin, useLogout } from 'libraries/authentication/hooks';

const LogoutButton = () => {
  const logout = useLogout();

  return <Button onClick={logout}>Logout</Button>;
};

const LoginButton = () => {
  const { login, isLoggingIn } = useLogin();
  return (
    <Button onClick={login} disabled={isLoggingIn}>
      {isLoggingIn ? 'Logging In...' : 'Login'}
    </Button>
  );
};

export const NavigationBar = () => {
  const { loginError } = useLogin();
  const [isAuthenticated] = useIsAuthenticated();

  useEffect(() => {
    loginError && console.log(loginError);
  }, [loginError]);

  return (
    <Flex justifyContent={'flex-end'} width={'100%'}>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Flex>
  );
};
