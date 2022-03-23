import { initializeConnector } from '@web3-react/core';
import { AVALANCHE } from 'consts';
import { MetaMask } from '@web3-react/metamask';
import { Actions } from '@web3-react/types';

const getMetaMaskConnector = (actions: Actions) => new MetaMask(actions);

const [connector, { useProvider, useWeb3React }] = initializeConnector<MetaMask>(
  getMetaMaskConnector,
  [parseInt(AVALANCHE.CHAIN_ID)]
);

export const useWallet = () => {
  const { account, active, chainId, error } = useWeb3React(useProvider());

  return {
    connector,
    chainId,
    account,
    active,
    error,
  };
};
