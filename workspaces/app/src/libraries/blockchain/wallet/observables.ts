import { JsonRpcProvider } from '@ethersproject/providers';
import { from, map } from 'rxjs';
import { ethers } from 'ethers';
import { AVALANCHE } from 'consts';
import { safeRound } from 'libraries/utils/math';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const getWalletBalance$ = (address: string) =>
  from(avalancheRpcProvider.getBalance(address)).pipe(
    map((balanceBigInt) => ethers.utils.formatEther(balanceBigInt)),
    map((balanceString) => parseFloat(balanceString)),
    map((balance) => safeRound(balance, 2))
  );
