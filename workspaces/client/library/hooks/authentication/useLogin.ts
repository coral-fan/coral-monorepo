import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import useWeb3 from '../web3';
import axios from 'axios';
import { signInWithCustomToken, getAuth, UserCredential } from 'firebase/auth';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { setCookie } from 'nookies';
import { map, mergeMap, of, pluck, withLatestFrom } from 'rxjs';

import { OpenLoginConnector } from 'library/Connectors/OpenLoginConnector';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { getAuthenticationMessage } from '@common/utils';

const fetchNonce = (address: string) =>
  axios.post<{ nonce: number }>('http://localhost:5001/torus-tutorial/us-central1/nonce', {
    address: address,
  });

const signAuthenticatedMessage = ([nonce, signer]: [number, Wallet | JsonRpcSigner]) =>
  signer.signMessage(getAuthenticationMessage(nonce));

const fetchFirebaseAuthToken = ([signedMessage, address]: [string, string]) =>
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

  const login = () => {
    setIsLoggingIn(true);

    const signer$ = of(getConnector()).pipe(
      map((connector) => {
        activate(connector);
        return connector; // return connector to be used in next function
      }),
      mergeMap(async (connector) =>
        connector instanceof OpenLoginConnector
          ? (connector.wallet as Wallet)
          : new Web3Provider(await connector.getProvider()).getSigner()
      ) // grabs either a wallet or JSON RPC signer depending on if the connector is OpenLogin or Provider
    );

    const address$ = signer$.pipe(mergeMap((signer) => signer.getAddress()));

    const idToken$ = address$.pipe(
      mergeMap(fetchNonce), // get nonce from back end
      pluck('data', 'nonce'), // get nonce value from axios return value
      withLatestFrom(signer$), // add signer into observable stream
      mergeMap(signAuthenticatedMessage), //sign a message
      withLatestFrom(address$), //add address into observable stream
      mergeMap(fetchFirebaseAuthToken), // get Firebase token from back end
      pluck('data', 'Bearer Token'), // get Bearer Token from axios return value
      mergeMap((token) => signInWithCustomToken(getAuth(), token)),
      mergeMap<UserCredential, Promise<string>>((userCredentials) =>
        userCredentials.user.getIdToken()
      ) // get user id token
    );

    idToken$.subscribe({
      next: (idToken) => {
        setCookie(undefined, 'token', idToken, { path: '/' });
        router.push((router.query.redirect as string) ?? '/');
      },
      error: (error) => {
        setLoginError(error);
        setIsLoggingIn(false);
      },
    });
  };

  return { login, isLoggingIn, loginError };
};
