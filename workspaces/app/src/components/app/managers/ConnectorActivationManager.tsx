import { parseCookies } from 'nookies';
import { useEffect } from 'react';

import { InjectedConnector } from '@web3-react/injected-connector';
import { OpenLoginConnector } from 'libraries/connectors/OpenLoginConnector';
import { useIsNetworkSupported, useWeb3 } from 'libraries/blockchain/hooks';

export const ConnectorActivationManager = () => {
  const { getConnector, activate } = useWeb3();
  const isNetworkSupported = useIsNetworkSupported();

  useEffect(() => {
    const { token } = parseCookies();
    const connector = getConnector();

    // open login auto login logic. is_open_login_pending is set to true during open login redirect
    if (token && connector instanceof OpenLoginConnector) {
      activate(connector);
    }

    // metamask auto login logic
    else if (token && connector instanceof InjectedConnector && isNetworkSupported) {
      connector.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(connector);
        }
      });
    }
  }, [getConnector, isNetworkSupported, activate]);

  return <></>;
};
