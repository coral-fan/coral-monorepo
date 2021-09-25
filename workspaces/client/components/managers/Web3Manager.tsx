import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect } from 'react';
import { OpenLoginConnector } from 'library/Connectors/OpenLoginConnector';
import useWeb3 from 'library/hooks/web3';
import { useLogin } from 'library/hooks/authentication';
import { IS_OPEN_LOGIN_PENDING } from 'consts';
import { parseCookies } from 'nookies';

interface props {
  children: JSX.Element;
}

export default function Web3Manager() {
  const { getConnector, activate } = useWeb3();
  const { login } = useLogin();

  useEffect(() => {
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
  }, []);

  return <></>;
}
