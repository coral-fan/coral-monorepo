import { useEffect } from 'react';
import { useWallet } from 'libraries/blockchain';
import { useIdToken } from 'libraries/authentication';

export const ConnectorActivationManager = () => {
  const { connector } = useWallet();

  const idToken = useIdToken();

  useEffect(() => {
    if (idToken && connector.connectEagerly) {
      connector.connectEagerly();
    }
  }, [idToken, connector]);

  return <></>;
};
