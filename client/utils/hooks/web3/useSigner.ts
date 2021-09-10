import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { OpenLoginConnector } from 'utils/Connectors/OpenLoginConnector';
import { useMemo } from 'react';

export default function useSigner() {
  const { library, connector } = useWeb3React<JsonRpcProvider | Web3Provider>();

  return useMemo(() => {
    if (connector instanceof OpenLoginConnector) {
      return connector.wallet;
    }
    return library?.getSigner();
  }, [connector, library]);
}
