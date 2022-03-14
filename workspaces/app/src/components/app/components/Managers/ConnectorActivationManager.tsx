import { useEffect } from 'react';
import { useWeb3 } from 'libraries/blockchain/hooks';

export const ConnectorActivationManager = () => {
  const { connector } = useWeb3();

  useEffect(() => {
    connector.connectEagerly();
  }, []);

  return <></>;
};
