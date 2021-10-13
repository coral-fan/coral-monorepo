import { useCallback, useMemo } from 'react';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

import { OpenLoginConnector } from 'libraries/Connectors/OpenLoginConnector';

import { SUPPORTED_CHAIN_IDS } from 'consts';

export default function useWeb3() {
  const { library, chainId, account, active, error, activate, deactivate, setError, connector } =
    useWeb3React<JsonRpcProvider | Web3Provider>();

  const injectedConnector = useMemo(
    () => new InjectedConnector({ supportedChainIds: SUPPORTED_CHAIN_IDS }),
    []
  );
  const openLoginConnector = useMemo(() => new OpenLoginConnector(), []);

  const signer = useMemo(
    () => (connector instanceof OpenLoginConnector ? connector.wallet : library?.getSigner()),
    [connector, library]
  );

  // TODO: figure what why connector needed to be removed from dependency array
  const getConnector = useCallback(
    () => (connector ?? window.ethereum ? injectedConnector : openLoginConnector),
    /* eslint react-hooks/exhaustive-deps: 'off' -- connector will never change. */
    []
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
