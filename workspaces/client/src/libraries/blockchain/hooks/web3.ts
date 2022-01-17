import { useCallback, useMemo } from 'react';
import { JsonRpcProvider, Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';

import { OpenLoginConnector } from 'libraries/connectors/OpenLoginConnector';

import { AVALANCHE } from 'consts';
import { AbstractConnector } from '@web3-react/abstract-connector';

export const useWeb3 = () => {
  const {
    library,
    chainId,
    account,
    active,
    error,
    activate: web3ReactActivate,
    deactivate,
    setError,
    connector,
  } = useWeb3React<JsonRpcProvider | Web3Provider>();

  const injectedConnector = useMemo(
    () => new InjectedConnector({ supportedChainIds: [parseInt(AVALANCHE.CHAIN_ID)] }),
    []
  );
  const openLoginConnector = useMemo(() => new OpenLoginConnector(), []);

  const signer = useMemo(
    () => (connector instanceof OpenLoginConnector ? connector.wallet : library?.getSigner()),
    [connector, library]
  );

  const getConnector = useCallback(
    () =>
      connector ??
      (window.ethereum && window.ethereum.addListener ? injectedConnector : openLoginConnector),
    [connector, injectedConnector, openLoginConnector]
  );

  const activate = useCallback(
    (connector: AbstractConnector) => web3ReactActivate(connector, undefined, true),
    [web3ReactActivate]
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
};
