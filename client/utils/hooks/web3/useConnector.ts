import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { useMemo } from 'react';
import { OpenLoginConnector } from 'utils/Connectors/OpenLoginConnector';

const INJECTED_CONNECTOR = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });
const OPEN_LOGIN_CONNECTOR = new OpenLoginConnector();

export default function useConnection() {
  const { connector } = useWeb3React();

  return useMemo(() => connector ?? INJECTED_CONNECTOR, [connector]);
}
