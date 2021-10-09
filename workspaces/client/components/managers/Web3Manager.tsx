import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect } from 'react';
import { OpenLoginConnector } from 'libraries/Connectors/OpenLoginConnector';
import useWeb3 from 'libraries/hooks/web3';
import { useLogin } from 'libraries/hooks/authentication';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { parseCookies } from 'nookies';

export default function Web3Manager() {
  const { getConnector, activate } = useWeb3();
  const { login } = useLogin();

  useEffect(
    () => {
      const { token } = parseCookies();
      const connector = getConnector();

      if (
        (token || sessionStorage.getItem(IS_OPEN_LOGIN_PENDING)) &&
        connector instanceof OpenLoginConnector
      ) {
        login().then(() => {
          sessionStorage.removeItem(IS_OPEN_LOGIN_PENDING);
        });
      }
      if (token && connector instanceof InjectedConnector) {
        connector.isAuthorized().then((isAuthorized) => {
          if (isAuthorized) {
            activate(connector);
          }
        });
      }
    },
    /* eslint react-hooks/exhaustive-deps: 'off' -- getConnector, activate & login will never change. */
    []
  );

  return <></>;
}
