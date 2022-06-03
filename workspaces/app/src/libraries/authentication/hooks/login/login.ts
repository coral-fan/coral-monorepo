import { useCallback, useState } from 'react';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { Web3Provider } from '@ethersproject/providers';
import { ConnectorType, CONNECTOR_MAP, useWallet } from 'libraries/blockchain';
import { useIsLoggingIn } from '..';
import { getNonce, getSignedAuthenticationMessage, getFirebaseCustomToken } from './utils';
import { useRefetchPageData } from 'libraries/utils/hooks';
import { useSuccessToast } from 'libraries/utils/toasts';

export const useLogin = (onSuccessCallback?: () => void) => {
  const [isLoggingIn, setIsLoggingIn] = useIsLoggingIn();
  const { connector: defaultConnector } = useWallet();
  const refetchPageData = useRefetchPageData();
  //TODO: should probably look into how to type errors better
  /* eslint @typescript-eslint/no-explicit-any: 'off' -- errors will always be typed as any */
  const [loginError, setLoginError] = useState<any>(null);
  const successToast = useSuccessToast();

  const login = useCallback(
    async (connectorTypeOverride?: ConnectorType) => {
      setIsLoggingIn(true);
      try {
        const connector = connectorTypeOverride
          ? CONNECTOR_MAP[connectorTypeOverride][0]
          : defaultConnector;

        await connector.activate();

        if (connector.provider !== undefined) {
          // need to destructure so provider is not undefined in callback function
          const { provider } = connector;

          const signer = new Web3Provider(provider).getSigner();

          const address = await signer.getAddress();
          const nonce = await getNonce(address);
          const signedMessage = await getSignedAuthenticationMessage(signer, nonce);
          const customToken = await getFirebaseCustomToken(address, signedMessage);
          await signInWithCustomToken(getAuth(), customToken);
          await refetchPageData();
          onSuccessCallback && onSuccessCallback();
        }
        setIsLoggingIn(false);
        successToast('Sign In Successful!');
      } catch (error) {
        // TODO: replace with better logging tool?
        console.error(error);
        setLoginError(error);
        setIsLoggingIn(false);
      }
    },
    [defaultConnector, refetchPageData, setIsLoggingIn, onSuccessCallback, successToast]
  );

  return { login, isLoggingIn, loginError };
};
