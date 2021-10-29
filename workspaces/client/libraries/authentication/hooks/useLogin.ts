import { useState } from 'react';
import axios from 'axios';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { setCookie } from 'nookies';

import { getAuthenticationMessage } from '@common/utils';

import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { OpenLoginConnector } from 'libraries/connectors/OpenLoginConnector';
import { useWeb3 } from 'libraries/blockchain/hooks';
import useAuthenticationContext from './context';

const fetchNonce = (address: string) =>
  axios.post<{ nonce: number }>('http://localhost:5001/torus-tutorial/us-central1/nonce', {
    address: address,
  });

const signAuthenticatedMessage = (signer: Wallet | JsonRpcSigner, nonce: number) =>
  signer.signMessage(getAuthenticationMessage(nonce));

const fetchFirebaseAuthToken = (address: string) => (signedMessage: string) =>
  axios.post<{ ['Bearer Token']: string }>(
    'http://localhost:5001/torus-tutorial/us-central1/auth',
    {
      address,
      signedMessage,
    }
  );

export const useLogin = () => {
  const { isLoggingIn, setIsLoggingIn, setIsTokenAuthenticated } = useAuthenticationContext();

  const { activate, getConnector } = useWeb3();
  //TODO: should probably look into how to type errors better
  /* eslint @typescript-eslint/no-explicit-any: 'off' -- errors will always be typed as any */
  const [loginError, setLoginError] = useState<any>(null);

  const login = async () => {
    setIsLoggingIn(true);

    const connector = getConnector();

    await activate(connector);

    const signer =
      connector instanceof OpenLoginConnector
        ? (connector.wallet as Wallet)
        : new Web3Provider(await connector.getProvider()).getSigner();

    // check if signer exists in case user closes out of open login modal
    if (signer) {
      const address = await signer.getAddress();

      fetchNonce(address)
        .then(({ data: { nonce } }) => signAuthenticatedMessage(signer, nonce))
        .then(fetchFirebaseAuthToken(address))
        .then(({ data: { ['Bearer Token']: token } }) => signInWithCustomToken(getAuth(), token))
        .then((userCredentials) => userCredentials.user.getIdToken())
        .then((idToken) => {
          if (sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) {
            sessionStorage.removeItem(IS_OPEN_LOGIN_PENDING);
          }

          setCookie(undefined, 'token', idToken, { path: '/' });
          setIsTokenAuthenticated(true);
          setIsLoggingIn(false);
        })
        .catch((error) => {
          setLoginError(error);
          setIsLoggingIn(false);
        });
    } else {
      setIsLoggingIn(false);
    }
  };

  return { login, isLoggingIn, loginError };
};
