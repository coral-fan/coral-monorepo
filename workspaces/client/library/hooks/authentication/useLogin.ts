import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useWeb3 from '../web3';
import axios from 'axios';
import { signInWithCustomToken, getAuth, UserCredential } from 'firebase/auth';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { setCookie } from 'nookies';

import { OpenLoginConnector } from 'library/Connectors/OpenLoginConnector';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { getAuthenticationMessage } from '@common/utils';

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
  const { activate, getConnector } = useWeb3();
  const router = useRouter();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) {
      setIsLoggingIn(true);
    }
  }, []);

  const [loginError, setLoginError] = useState(null);

  const login = async () => {
    setIsLoggingIn(true);

    const connector = getConnector();

    activate(connector);

    const signer =
      connector instanceof OpenLoginConnector
        ? (connector.wallet as Wallet)
        : new Web3Provider(await connector.getProvider()).getSigner();

    const address = await signer.getAddress();

    fetchNonce(address)
      .then(({ data: { nonce } }) => signAuthenticatedMessage(signer, nonce))
      .then(fetchFirebaseAuthToken(address))
      .then(({ data: { ['Bearer Token']: token } }) => signInWithCustomToken(getAuth(), token))
      .then((userCredentials) => userCredentials.user.getIdToken())
      .then((idToken) => {
        setCookie(undefined, 'token', idToken, { path: '/' });
        router.push((router.query.redirect as string) ?? '/');
      })
      .catch((error) => {
        setLoginError(error);
        setIsLoggingIn(false);
      });
  };

  return { login, isLoggingIn, loginError };
};
