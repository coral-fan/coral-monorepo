import { initializeConnector } from '@web3-react/core';
import { AVALANCHE } from 'consts';
import { MetaMask } from '@web3-react/metamask';
import { Actions } from '@web3-react/types';
import { JsonRpcProvider } from '@ethersproject/providers';
import { from, map } from 'rxjs';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

const getMetaMaskConnector = (actions: Actions) => new MetaMask(actions);

export const [connector, { useProvider, useWeb3React }] = initializeConnector<MetaMask>(
  getMetaMaskConnector,
  [AVALANCHE.CHAIN_ID.INT]
);

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

const safeRound = (value: number, decimalPlace: number) => {
  if (!Number.isInteger(decimalPlace)) {
    throw Error(`Number ${decimalPlace} is not a integer.`);
  }

  const decimalFactor = 10 ** decimalPlace;

  return Math.round((value + Number.EPSILON) * decimalFactor) / decimalFactor;
};

export const getWalletBalance$ = (address: string) =>
  from(avalancheRpcProvider.getBalance(address)).pipe(
    map((balanceBigInt) => ethers.utils.formatEther(balanceBigInt)),
    map((balanceString) => parseFloat(balanceString)),
    map((balance) => safeRound(balance, 2))
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
