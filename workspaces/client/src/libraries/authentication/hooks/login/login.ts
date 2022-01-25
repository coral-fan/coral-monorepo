import { useState } from 'react';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { Web3Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { setCookie } from 'nookies';

import { COOKIE_OPTIONS, IS_OPEN_LOGIN_PENDING } from 'consts';
import { OpenLoginConnector } from 'libraries/connectors/OpenLoginConnector';
import { useWeb3 } from 'libraries/blockchain';
import { useIsLoggingIn } from '..';
import { fetchNonce, signAuthenticatedMessage, fetchFirebaseAuthToken } from './utils';

export const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useIsLoggingIn();

  const { activate, getConnector } = useWeb3();
  //TODO: should probably look into how to type errors better
  /* eslint @typescript-eslint/no-explicit-any: 'off' -- errors will always be typed as any */
  const [loginError, setLoginError] = useState<any>(null);

  const login = async () => {
    setIsLoggingIn(true);

    const connector = getConnector();

    try {
      await activate(connector);

      const signer =
        connector instanceof OpenLoginConnector
          ? (connector.wallet as Wallet) // casting since metamask will have connected or thrown error in activate function call & signer connector.wallet won't ever be undefined
          : new Web3Provider(await connector.getProvider()).getSigner();

      // check if signer exists in case user closes out of open login modal
      if (signer) {
        const address = await signer.getAddress();
        const {
          data: { nonce },
        } = await fetchNonce(address);
        const signedMessage = await signAuthenticatedMessage(signer, nonce);
        const {
          data: { token },
        } = await fetchFirebaseAuthToken(address, signedMessage);

        const userCredential = await signInWithCustomToken(getAuth(), token);
        const idToken = await userCredential.user.getIdToken();

        if (sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) {
          sessionStorage.removeItem(IS_OPEN_LOGIN_PENDING);
        }

        setCookie(undefined, 'token', idToken, COOKIE_OPTIONS);
        setIsLoggingIn(false);
      } else {
        setIsLoggingIn(false);
      }
    } catch (error) {
      setLoginError(error);
      setIsLoggingIn(false);
    }
  };

  return { login, isLoggingIn, loginError };
};
