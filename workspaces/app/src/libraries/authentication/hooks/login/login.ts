import { useCallback } from 'react';
import { signInWithCustomToken, getAuth } from 'firebase/auth';
import { Web3Provider } from '@ethersproject/providers';
import { ConnectorType, CONNECTOR_MAP } from 'libraries/blockchain';
import { useIsLoggingIn } from '..';
import { getNonce, getSignedAuthenticationMessage, getFirebaseCustomToken } from './utils';
import { useRefetchPageData } from 'libraries/utils/hooks';
import { useErrorToast, useSuccessToast } from 'libraries/utils/toasts';
import { MetaMaskConnector } from 'libraries/blockchain/wallet/connectors';

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
          if (connector instanceof MetaMaskConnector) {
            window.location.reload();
          } else {
            await refetchPageData();
          }
          successToast('Signed in!');
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- need any for error handling
      } catch (e: any) {
        console.error(e);
        if (e.code === 4001) {
          errorToast('User rejected transaction');
        } else {
          errorToast('Sign in unsuccessful. Please try again');
        }
      }

      setIsLoggingIn(false);
    },
    [refetchPageData, setIsLoggingIn, successToast, errorToast]
  );

  return { login, isLoggingIn };
};
