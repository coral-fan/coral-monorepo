import { useCallback } from 'react';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { Web3Provider } from '@ethersproject/providers';
import { ConnectorType, CONNECTOR_MAP } from 'libraries/blockchain';
import { useIsLoggingIn } from '..';
import { getNonce, getSignedAuthenticationMessage, getFirebaseCustomToken } from './utils';
import { useRefetchPageData } from 'libraries/utils/hooks';
import { useErrorToast, useSuccessToast } from 'libraries/utils/toasts';

export const useLogin = () => {
  const [isLoggingIn, setIsLoggingIn] = useIsLoggingIn();
  const refetchPageData = useRefetchPageData();

  const successToast = useSuccessToast();
  const errorToast = useErrorToast();

  const login = useCallback(
    async (connectorType: ConnectorType) => {
      setIsLoggingIn(true);
      try {
        const [connector] = CONNECTOR_MAP[connectorType];

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
          successToast('Signed in!');
        }
      } catch (e) {
        console.error(e);
        if (e instanceof Error) {
          if (!e.message.includes('MetaMask')) {
            errorToast('Sign in unsuccessful. Please try again');
          }
        }
      }
      setIsLoggingIn(false);
    },
    [refetchPageData, setIsLoggingIn, successToast, errorToast]
  );

  return { login, isLoggingIn };
};
