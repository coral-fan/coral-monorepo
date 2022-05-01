import { useEffect, useState } from 'react';
import { useWallet } from 'libraries/blockchain';
import { useIdToken } from 'libraries/authentication';

export const ConnectorActivationManager = () => {
  const { isActive, connector } = useWallet();

  const idToken = useIdToken();

  // TODO: put is connecting state inside of wallet hook?
  // is connecting acts as a mutex lock to prevent multiple calls to connect eagerly before one resolves
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (idToken && !isActive && !isConnecting && connector.connectEagerly) {
      setIsConnecting(true);
      const maybePromise = connector.connectEagerly();
      // maybePromised needs to be checked for what type it is since it can return void OR Promise<void>
      if (maybePromise instanceof Promise) {
        maybePromise.then(() => setIsConnecting(false));
      } else {
        setIsConnecting(false);
      }
    }
  }, [idToken, isActive, isConnecting, connector]);

  return <></>;
};
