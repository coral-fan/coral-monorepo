import { useEffect } from 'react';
import { OpenLoginConnector } from 'utils/Connectors/OpenLoginConnector';
import useWeb3 from 'utils/hooks/web3';
interface props {
  children: JSX.Element;
}

export default function Web3Manager({ children }: props) {
  const { connector, activate } = useWeb3();
  console.log(useWeb3());

  useEffect(() => {
    if (connector instanceof OpenLoginConnector) {
      connector.shouldEagerLoad().then((shouldEagerLoad) => {
        if (shouldEagerLoad) {
          activate(connector);
        }
      });
    }
  }, []);
  return children;
}
