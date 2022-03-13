import { parseCookies } from 'nookies';
import { useEffect } from 'react';

import { InjectedConnector } from '@web3-react/injected-connector';
import { useIsNetworkSupported, useWeb3 } from 'libraries/blockchain/hooks';

export const ConnectorActivationManager = () => {
  const { getConnector, activate } = useWeb3();
  const isNetworkSupported = useIsNetworkSupported();

  useEffect(() => {
    const { token } = parseCookies();
    const connector = getConnector();

    // metamask auto login logic
    if (token && connector instanceof InjectedConnector && isNetworkSupported) {
      connector.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(connector);
        }
      });
    }
  }, [getConnector, isNetworkSupported, activate]);

  return <></>;
};
