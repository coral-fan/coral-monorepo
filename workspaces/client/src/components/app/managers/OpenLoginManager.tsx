import { useEffect } from 'react';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { useIsLoggingIn, useLogin } from 'libraries/authentication/hooks';

// checks if token is authenticated, user is not signing up and that their wallet is active and updates the redux store state accordingly
export const OpenLoginManager = () => {
  const { login } = useLogin();
  const [, setIsLoggingIn] = useIsLoggingIn();

  useEffect(() => {
    if (sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) {
      setIsLoggingIn(true);
      login();
    }
  }, [setIsLoggingIn, login]);

  return <></>;
};
