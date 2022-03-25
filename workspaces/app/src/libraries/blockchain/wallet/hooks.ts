import { initializeConnector } from '@web3-react/core';
import { AVALANCHE } from 'consts';
import { MetaMask } from '@web3-react/metamask';
import { Actions } from '@web3-react/types';

const getMetaMaskConnector = (actions: Actions) => new MetaMask(actions);

const [connector, { useProvider, useWeb3React }] = initializeConnector<MetaMask>(
  getMetaMaskConnector,
  [AVALANCHE.CHAIN_ID.INT]
);

export const useWallet = () => {
  const { account: address, active: isActive, chainId, error } = useWeb3React(useProvider());

  return {
    connector,
    chainId,
    address,
    isActive,
    error,
  };
};
