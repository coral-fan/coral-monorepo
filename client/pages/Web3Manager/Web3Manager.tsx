import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect } from 'react';
import { OpenLoginConnector } from 'utils/Connectors/OpenLoginConnector';
import useWeb3 from 'utils/hooks/web3';
import { useLogin } from 'utils/hooks/authentication';
import { parseCookies } from 'nookies';

interface props {
  children: JSX.Element;
}

export default function Web3Manager({ children }: props) {
  const { getConnector, activate } = useWeb3();
  const { login } = useLogin();

  useEffect(() => {
    const { token } = parseCookies();
    const connector = getConnector();

    if (
      (token || sessionStorage.getItem('open_login_in_progress')) &&
      connector instanceof OpenLoginConnector
    ) {
      login().then(() => {
        sessionStorage.removeItem('open_login_in_progress');
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

  return children;
}
