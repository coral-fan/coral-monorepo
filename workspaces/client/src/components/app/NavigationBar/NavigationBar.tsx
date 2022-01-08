import { useEffect } from 'react';

import { Button } from 'components/ui';

import { useIsAuthenticated, useLogin, useLogout } from 'libraries/authentication/hooks';
import styled from '@emotion/styled';

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

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

export const NavigationBar = () => {
  const { loginError } = useLogin();
  const [isAuthenticated] = useIsAuthenticated();

  useEffect(() => {
    loginError && console.log(loginError);
  }, [loginError]);

  return <Container>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</Container>;
};
