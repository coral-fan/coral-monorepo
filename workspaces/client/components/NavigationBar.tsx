import { Flex, Button } from './ui';
import { useEffect } from 'react';
import { useAuthentication, useLogin, useLogout } from 'libraries/authentication/hooks';

const LogoutButton = () => {
  const logout = useLogout();

  return <Button onClick={logout}>Logout</Button>;
};

const LoginButton = () => {
  const { login, isLoggingIn } = useLogin();
  return <Button onClick={login}>{isLoggingIn ? 'Logging In...' : 'Login'}</Button>;
};

export default function NavigationBar() {
  const { loginError } = useLogin();
  const [isAuthenticated] = useAuthentication();

  useEffect(() => {
    loginError && console.log(loginError);
  }, [loginError]);

  return (
    <Flex justifyContent={'flex-end'} width={'100%'}>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </Flex>
  );
}
