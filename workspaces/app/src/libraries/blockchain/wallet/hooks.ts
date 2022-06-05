import { useEffect, useMemo, useState } from 'react';
import { Actions, Connector } from '@web3-react/types';
import { initializeConnector } from '@web3-react/core';
import create from 'zustand';
import { persist } from 'zustand/middleware';
import { AVALANCHE } from 'consts';
import { Web3AuthConnector, MetaMaskConnector } from './connectors';
import { useIsMetaMaskInjected } from '../metamask';
import { getWalletBalance$ } from './observables';

const getWeb3AuthConnector = (actions: Actions) => new Web3AuthConnector(actions);
const getMetaMaskConnector = (actions: Actions) => new MetaMaskConnector(actions);

export const CONNECTOR_MAP = {
  WEB3AUTH: initializeConnector<Connector>(getWeb3AuthConnector, [AVALANCHE.CHAIN_ID.INT]),
  METAMASK: initializeConnector<Connector>(getMetaMaskConnector),
};

export type ConnectorType = keyof typeof CONNECTOR_MAP;

// TODO: revisit connector state implementation
interface ConnectorState {
  defaultConnectorType: ConnectorType;
  setDefaultConnectorType: (defaultConnectorType: ConnectorType) => void;
  connectorType?: ConnectorType;
  setConnectorType: (connectorType?: ConnectorType) => void;
}

const useConnectorState = create<ConnectorState>()(
  persist(
    (set) => ({
      defaultConnectorType: 'WEB3AUTH',
      setDefaultConnectorType: (defaultConnectorType) =>
        set((state) => ({ ...state, defaultConnectorType })),
      connectorType: undefined,
      setConnectorType: (connectorType) => set((state) => ({ ...state, connectorType })),
    }),
    {
      name: 'coral_connector_store',
    }
  )
);
// TODO: refactor to stop exposing connector direcly through hook?
export const useWallet = () => {
  const isMetaMaskInjected = useIsMetaMaskInjected();

  const { defaultConnectorType, setDefaultConnectorType, connectorType, setConnectorType } =
    useConnectorState();

  useEffect(() => {
    setDefaultConnectorType(isMetaMaskInjected ? 'METAMASK' : 'WEB3AUTH');
  }, [setDefaultConnectorType, isMetaMaskInjected]);

  const [connector, { useAccount, useChainId, useError, useIsActive, useProvider }] = useMemo(
    () => CONNECTOR_MAP[connectorType ?? defaultConnectorType],
    [connectorType, defaultConnectorType]
  );

  const address = useAccount();

  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    if (address) {
      getWalletBalance$(address).subscribe(setBalance);
    }
  }, [address]);

  const chainId = useChainId();

  const error = useError();

  const isActive = useIsActive();

  const provider = useProvider();

  return {
    isActive,
    connector,
    provider,
    address,
    chainId,
    balance,
    error,
    setConnectorType,
  };
};
