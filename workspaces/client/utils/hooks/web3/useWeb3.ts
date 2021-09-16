import { useCallback, useMemo } from 'react';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

import { OpenLoginConnector } from 'utils/Connectors/OpenLoginConnector';

export default function useWeb3() {
  const { library, chainId, account, active, error, activate, deactivate, setError, connector } =
    useWeb3React<JsonRpcProvider | Web3Provider>();

  const injectedConnector = useMemo(
    () => new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] }),
    []
  );
  const openLoginConnector = useMemo(() => new OpenLoginConnector(), []);

  const signer = useMemo(
    () => (connector instanceof OpenLoginConnector ? connector.wallet : library?.getSigner()),
    [connector, library]
  );

  const getConnector = useCallback(
    () => (connector ?? window.ethereum ? injectedConnector : openLoginConnector),
    [connector]
  );

  return {
    getConnector,
    library,
    chainId,
    account,
    active,
    error,
    activate,
    deactivate,
    setError,
    signer,
  };
}
