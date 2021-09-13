import { isAddress } from '@ethersproject/address';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useEffect } from 'react';
import { OpenLoginConnector } from 'utils/Connectors/OpenLoginConnector';
import useWeb3 from 'utils/hooks/web3';
interface props {
  children: JSX.Element;
}

export default function Web3Manager({ children }: props) {
  const { connector, activate } = useWeb3();

  useEffect(() => {
    if (connector instanceof OpenLoginConnector) {
      connector.shouldEagerConnect().then((shouldEagerLoad) => {
        if (shouldEagerLoad) {
          activate(connector);
        }
      });
      if (connector instanceof InjectedConnector) {
        connector.isAuthorized().then((isAuthorized) => {
          if (isAuthorized) {
            activate(connector);
          }
        });
      }
    }
  }, []);

  return children;
}
