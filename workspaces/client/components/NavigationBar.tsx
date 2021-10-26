import { Flex, Button } from './ui';

import { useLogin, useLogout } from 'libraries/hooks/authentication';
import { useEffect } from 'react';
import { useAuthentication } from 'libraries/providers/authentication';

export default function NavigationBar() {
  const { isAuthenticated } = useAuthentication();
  const { login, isLoggingIn, loginError } = useLogin();
  const logout = useLogout();

  useEffect(() => {
    loginError && console.log(loginError);
  }, [loginError]);

  return (
    <Flex justifyContent={'flex-end'} width={'100%'}>
      {isAuthenticated ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Button onClick={login}>{isLoggingIn ? 'Logging In...' : 'Login'}</Button>
      )}
    </Flex>
  );
}
