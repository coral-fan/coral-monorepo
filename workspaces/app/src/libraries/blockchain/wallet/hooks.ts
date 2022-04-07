import { useEffect, useState } from 'react';
import { initializeConnector } from '@web3-react/core';
import { AVALANCHE } from 'consts';
import { MetaMask } from '@web3-react/metamask';
import { Actions } from '@web3-react/types';
import { getWalletBalance$ } from './observables';

const getMetaMaskConnector = (actions: Actions) => new MetaMask(actions);

export const [connector, { useProvider, useWeb3React }] = initializeConnector<MetaMask>(
  getMetaMaskConnector,
  [AVALANCHE.CHAIN_ID.INT]
);

export const useWallet = () => {
  const { account: address, active: isActive, chainId, error } = useWeb3React(useProvider());

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
