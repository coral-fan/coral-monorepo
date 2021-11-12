import { useState } from 'react';
import axios from 'axios';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { Wallet } from '@ethersproject/wallet';
import { setCookie } from 'nookies';

import { getAuthenticationMessage } from '@common/utils';
import { SignUp } from '@common/models';

import { API_ENDPOINT, COOKIE_OPTIONS, IS_OPEN_LOGIN_PENDING } from 'consts';
import { OpenLoginConnector } from 'libraries/connectors/OpenLoginConnector';
import { useWeb3 } from 'libraries/blockchain/hooks';
import { useIsLoggingIn, useIsTokenAuthenticated } from '.';
import { useIsSigningUp } from './isSigningUp';
import { useSignUpCompletedSubject } from './signUpCompleteSubject';
import { concatMap, from, iif, map, of, tap } from 'rxjs';
import { getDocRef } from 'libraries/firebase';
import { setDoc } from '@firebase/firestore';

const apiAxios = axios.create({
  baseURL: API_ENDPOINT,
});

const fetchNonce = (address: string) =>
  apiAxios.post<{ nonce: number }>('nonce', {
    address: address,
  });

const signAuthenticatedMessage = (signer: Wallet | JsonRpcSigner, nonce: number) =>
  signer.signMessage(getAuthenticationMessage(nonce));

const fetchFirebaseAuthToken = (address: string) => (signedMessage: string) =>
  apiAxios.post<{ ['Bearer Token']: string }>('auth', {
    address,
    signedMessage,
  });

const fetchIsSigningUp = (idToken: string) =>
  apiAxios.post<SignUp>('isSigningUp', {
    idToken,
  });

export const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useIsLoggingIn();
  const [, setIsTokenAuthenticated] = useIsTokenAuthenticated();
  const [, setIsSigningUp] = useIsSigningUp();
  const signUpCompleteSubject = useSignUpCompletedSubject();

  const { activate, getConnector } = useWeb3();
  //TODO: should probably look into how to type errors better
  /* eslint @typescript-eslint/no-explicit-any: 'off' -- errors will always be typed as any */
  const [loginError, setLoginError] = useState<any>(null);

  // TODO: could probably refactor this logic to use an epic?
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

      // RxJS based implementation
      from(fetchNonce(address))
        .pipe(
          concatMap(({ data: { nonce } }) => signAuthenticatedMessage(signer, nonce)),
          concatMap(fetchFirebaseAuthToken(address)),
          concatMap(({ data: { ['Bearer Token']: token } }) =>
            signInWithCustomToken(getAuth(), token)
          ),
          concatMap((userCredentials) => userCredentials.user.getIdToken()),
          concatMap((idToken) =>
            from(fetchIsSigningUp(idToken)).pipe(
              concatMap(({ data: { isSigningUp } }) => {
                const idToken$ = of(idToken);
                return iif(
                  () => isSigningUp,
                  idToken$.pipe(
                    tap(() => setIsSigningUp(true)),
                    concatMap((idToken) =>
                      signUpCompleteSubject.pipe(
                        tap(async () => {
                          const signUpRef = getDocRef('is-signing-up', address);
                          const signUp: SignUp = { isSigningUp: false };
                          await setDoc(signUpRef, signUp);
                          setIsSigningUp(false);
                        }),
                        map(() => idToken)
                      )
                    )
                  ),
                  of(idToken)
                );
              })
            )
          )
        )
        .subscribe({
          next: (idToken) => {
            if (sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) {
              sessionStorage.removeItem(IS_OPEN_LOGIN_PENDING);
            }
            setCookie(undefined, 'token', idToken, COOKIE_OPTIONS);
            setIsTokenAuthenticated(true);
            setIsLoggingIn(false);
          },
          error: (error) => {
            setLoginError(error);
            setIsLoggingIn(false);
          },
        });
    } else {
      setIsLoggingIn(false);
    }
  };

  return { login, isLoggingIn, loginError };
};
