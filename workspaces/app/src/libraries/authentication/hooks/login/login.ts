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
  const { connector, active } = useWeb3();
  const refetchPageData = useRefetchPageData();
  //TODO: should probably look into how to type errors better
  /* eslint @typescript-eslint/no-explicit-any: 'off' -- errors will always be typed as any */
  const [loginError, setLoginError] = useState<any>(null);

  const login = async () => {
    setIsLoggingIn(true);
    try {
      if (!active) {
        await connector.activate();
      }
      if (connector.provider !== undefined) {
        // need to destructure so provider is not undefined in callback function
        const { provider } = connector;
        const signer = new Web3Provider((method, params) =>
          provider.request({ method, params })
        ).getSigner();
        const address = await signer.getAddress();
        const nonce = await getNonce(address);
        const signedMessage = await getSignedAuthenticationMessage(signer, nonce);
        const customToken = await getFirebaseCustomToken(address, signedMessage);
        const userCredential = await signInWithCustomToken(getAuth(), customToken);

        const isSigningUp = await getIsUserSigningUp(userCredential.user.uid);
        setIsSigningUp(isSigningUp);
        refetchPageData();
      }
      setIsLoggingIn(false);
    } catch (error) {
      setLoginError(error);
      setIsLoggingIn(false);
    }
  };

  return { login, isLoggingIn, loginError };
};
