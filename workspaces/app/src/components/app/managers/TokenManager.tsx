import { COOKIE_OPTIONS } from 'consts';
import { getToken$ } from 'libraries/authentication';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect } from 'react';

export const TokenManager = () => {
  useEffect(() => {
    const subscription = getToken$().subscribe((token) => {
      if (token === null) {
        destroyCookie(undefined, 'token', COOKIE_OPTIONS);
      } else {
        setCookie(undefined, 'token', token, COOKIE_OPTIONS);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return <></>;
};
