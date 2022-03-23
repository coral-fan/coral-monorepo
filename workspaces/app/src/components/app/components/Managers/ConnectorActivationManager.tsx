import { useEffect } from 'react';
import { useWallet } from 'libraries/blockchain';

export const ConnectorActivationManager = () => {
  const { connector } = useWallet();

  useEffect(() => {
    connector.connectEagerly();
  }, [connector]);

  return <></>;
};
