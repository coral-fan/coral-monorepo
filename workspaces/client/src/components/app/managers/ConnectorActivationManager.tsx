import { parseCookies } from 'nookies';
import { useEffect } from 'react';

import { InjectedConnector } from '@web3-react/injected-connector';
import { OpenLoginConnector } from 'libraries/connectors/OpenLoginConnector';
import { useWeb3 } from 'libraries/blockchain/hooks';

export const ConnectorActivationManager = () => {
  const { getConnector, activate } = useWeb3();

  useEffect(() => {
    const { token } = parseCookies();
    const connector = getConnector();

    // open login auto login logic. is_open_login_pending is set to true during open login redirect
    if (token && connector instanceof OpenLoginConnector) {
      activate(connector);
    }

    // metamask auto login logic
    if (token && connector instanceof InjectedConnector) {
      connector.isAuthorized().then((isAuthorized) => {
        if (isAuthorized) {
          activate(connector);
        }
      });
    }
    // TODO: look into why it reruns indefinitely at some point with an exhaustive dependency array for open login. likely has to do with issue in open login connector implementation...
    /* eslint react-hooks/exhaustive-deps: 'off' -- dependency array must be empty or it will run in an infinite loop. */
  }, []);

  return <></>;
};
