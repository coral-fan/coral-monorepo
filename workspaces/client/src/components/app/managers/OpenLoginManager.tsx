import { useEffect } from 'react';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { useIsLoggingIn, useLogin } from 'libraries/authentication';

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
