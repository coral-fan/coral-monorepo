import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect } from 'react';
import { OpenLoginConnector } from 'libraries/Connectors/OpenLoginConnector';
import useWeb3 from 'libraries/hooks/web3';
import { useLogin } from 'libraries/hooks/authentication';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { parseCookies } from 'nookies';

export default function Web3Manager() {
  const { getConnector, activate, active } = useWeb3();
  const { login } = useLogin();

  useEffect(() => {
    const { token } = parseCookies();
    const connector = getConnector();

    // open login auto login logic. is_open_login_pending is set to true during open login redirect
    if (
      (token || sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) &&
      connector instanceof OpenLoginConnector
    ) {
      // active must be checked, or the useEffect will rerun indefinitely
      if (!active) {
        login().then(() => {
          sessionStorage.removeItem(IS_OPEN_LOGIN_PENDING);
        });
      }
    }

    // metamask auto login logic
    if (token && connector instanceof InjectedConnector) {
      connector.isAuthorized().then((isAuthorized) => {
        // active must be checked, or the useEffect will rerun indefinitely
        if (isAuthorized && !active) {
          activate(connector);
        }
      });
    }
  }, [activate, active, getConnector, login]);

  return <></>;
}
