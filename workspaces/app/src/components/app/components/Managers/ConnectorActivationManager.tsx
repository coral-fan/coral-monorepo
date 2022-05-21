import { useEffect } from 'react';
import { useWallet } from 'libraries/blockchain';
import { useIsAuthenticated } from 'libraries/authentication';

export const ConnectorActivationManager = () => {
  const { connector, isActive } = useWallet();
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (isAuthenticated && !isActive && connector.connectEagerly) {
      connector.connectEagerly();
    }
  }, [isAuthenticated, isActive, connector]);

  return <></>;
};
