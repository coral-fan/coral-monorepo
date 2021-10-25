import { Flex, Button } from './ui';

import { useLogin } from 'libraries/hooks/authentication';
import { useEffect } from 'react';

export default function NavigationBar() {
  const { login, isLoggingIn, loginError } = useLogin();

  useEffect(() => {
    loginError && console.log(loginError);
  }, [loginError]);

  return (
    <Flex justifyContent={'flex-end'} width={'100%'}>
      <Button onClick={login}>{isLoggingIn ? 'Logging In...' : 'Login'}</Button>
    </Flex>
  );
}
