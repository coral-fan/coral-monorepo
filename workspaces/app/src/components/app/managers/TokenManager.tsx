import { COOKIE_OPTIONS, ID_TOKEN_KEY } from 'consts';
import { getIdToken$ } from 'libraries/authentication';
import { destroyCookie, setCookie } from 'nookies';
import { useEffect } from 'react';

export const TokenManager = () => {
  useEffect(() => {
    const subscription = getIdToken$().subscribe((idToken) => {
      if (idToken === null) {
        destroyCookie(undefined, ID_TOKEN_KEY, COOKIE_OPTIONS);
      } else {
        setCookie(undefined, ID_TOKEN_KEY, idToken, COOKIE_OPTIONS);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  return <></>;
};
