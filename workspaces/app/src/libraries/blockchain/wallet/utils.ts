import { Web3Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';

const ROUND_TO = 100;
export const getWalletBalance = async (
  address: string | undefined,
  provider: Web3Provider | undefined
) => {
  if (!(address && provider)) {
    return null;
  }

  const balance = await provider.getBalance(address);
  const balanceFormatted = ethers.utils.formatEther(balance);

  return Math.round((parseFloat(balanceFormatted) + Number.EPSILON) * ROUND_TO) / ROUND_TO;
};
