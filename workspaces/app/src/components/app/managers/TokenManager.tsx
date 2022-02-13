import { COOKIE_OPTIONS, ID_TOKEN_KEY } from 'consts';
import { getToken$ } from 'libraries/authentication';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect } from 'react';

export const TokenManager = () => {
  useEffect(() => {
    const subscription = getToken$().subscribe((token) => {
      if (token === null) {
        destroyCookie(undefined, ID_TOKEN_KEY, COOKIE_OPTIONS);
      } else {
        setCookie(undefined, ID_TOKEN_KEY, token, COOKIE_OPTIONS);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return <></>;
};
