import { Flex, Button } from './ui';
import { useEffect } from 'react';
import { useAuthentication, useLogin, useLogout } from 'libraries/authentication/hooks';

export default function NavigationBar() {
  const [isAuthenticated] = useAuthentication();
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
