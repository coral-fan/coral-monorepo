import { useEffect, useMemo, useState } from 'react';
import { Actions, Connector } from '@web3-react/types';
import { initializeConnector } from '@web3-react/core';
import { MetaMask as MetaMaskConnector } from '@web3-react/metamask';
import { AVALANCHE } from 'consts';
import { useUserUid } from 'libraries/models';
import { CustomAuthConnector } from './connectors';
import { useIsMetaMaskInjected } from '../metamask';
import { getWalletBalance$ } from './observables';

const getCustomAuthConnector = (actions: Actions) => new CustomAuthConnector(actions);

const customAuth = initializeConnector<Connector>(getCustomAuthConnector, [AVALANCHE.CHAIN_ID.INT]);

const getMetaMaskConnector = (actions: Actions) => new MetaMaskConnector(actions);

const metaMask = initializeConnector<Connector>(getMetaMaskConnector);

export const useWallet = () => {
  const isMetaMaskInjected = useIsMetaMaskInjected();

  const [connector, { useWeb3React, useProvider }] = useMemo(
    () => (isMetaMaskInjected ? metaMask : customAuth),
    [isMetaMaskInjected]
  );

  const provider = useProvider();

  const { active: isActive, chainId, error } = useWeb3React(provider);

  // user uid, aka, id in Firebase is their wallet address
  const address = useUserUid();

  const [balance, setBalance] = useState<number>();

  useEffect(() => {
    if (address) {
      getWalletBalance$(address).subscribe(setBalance);
    }
  }, [address]);

  return {
    connector,
    chainId,
    address,
    balance,
    isActive,
    error,
  };
};
