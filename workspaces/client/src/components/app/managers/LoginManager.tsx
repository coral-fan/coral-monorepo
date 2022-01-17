import { parseCookies } from 'nookies';
import { useEffect } from 'react';

import { InjectedConnector } from '@web3-react/injected-connector';
import { OpenLoginConnector } from 'libraries/connectors/OpenLoginConnector';
import { useWeb3 } from 'libraries/blockchain/hooks';
import { IS_OPEN_LOGIN_PENDING } from 'consts';

export const LoginManager = () => {
  const { getConnector, activate, active } = useWeb3();

  useEffect(() => {
    const { token } = parseCookies();
    const connector = getConnector();

    if (!active) {
      // open login auto login logic. is_open_login_pending is set to true during open login redirect
      if (
        (token || sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) &&
        connector instanceof OpenLoginConnector
      ) {
        activate(connector);
      }

      // metamask auto login logic
      if (connector instanceof InjectedConnector) {
        connector.isAuthorized().then((isAuthorized) => {
          if (isAuthorized) {
            activate(connector);
          }
        });
      }
    }
    // TODO: look into why it reruns indefinitely at some point with an exhaustive dependency array for open login. likely has to do with issue in open login connector implementation...
    /* eslint react-hooks/exhaustive-deps: 'off' -- dependency array must be empty or it will run in an infinite loop. */
  }, []);

  return <></>;
};
