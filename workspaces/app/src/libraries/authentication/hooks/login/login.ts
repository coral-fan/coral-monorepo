import { useState } from 'react';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3 } from 'libraries/blockchain';
import { useIsLoggingIn, useIsSigningUp } from '..';
import { getNonce, getSignedAuthenticationMessage, getFirebaseCustomToken } from './utils';
import { getIsUserSigningUp } from 'libraries/models';
import { useRefetchPageData } from 'libraries/utils/hooks';

export const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useIsLoggingIn();
  const [, setIsSigningUp] = useIsSigningUp();
  const { activate, getConnector } = useWeb3();
  const refetchPageData = useRefetchPageData();
  //TODO: should probably look into how to type errors better
  /* eslint @typescript-eslint/no-explicit-any: 'off' -- errors will always be typed as any */
  const [loginError, setLoginError] = useState<any>(null);

  const login = async () => {
    setIsLoggingIn(true);

    const connector = getConnector();

    try {
      await activate(connector);

      const signer = new Web3Provider(await connector.getProvider()).getSigner();

      // check if signer exists in case user closes out of open login modal
      if (signer) {
        const address = await signer.getAddress();
        const nonce = await getNonce(address);
        const signedMessage = await getSignedAuthenticationMessage(signer, nonce);
        const customToken = await getFirebaseCustomToken(address, signedMessage);
        const userCredential = await signInWithCustomToken(getAuth(), customToken);

        const isSigningUp = await getIsUserSigningUp(userCredential.user.uid);
        setIsSigningUp(isSigningUp);
        setIsLoggingIn(false);
        refetchPageData();
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
