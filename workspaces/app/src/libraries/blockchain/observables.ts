import { CoralNftV1__factory } from '@coral/contracts/dist';
import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE } from 'consts';
import { fromEvent, startWith, Observable, switchMap, map, retry, tap } from 'rxjs';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const newBlock$ = (fromEvent(avalancheRpcProvider, 'block') as Observable<number>).pipe(
  tap(console.log),
  retry()
);

export const getUserTokenBalance$ = (collectionAddress: string, userAddress: string) => {
  const nftContract = CoralNftV1__factory.connect(collectionAddress, avalancheRpcProvider);

  return newBlock$.pipe(
    startWith(nftContract.balanceOf(userAddress)),
    switchMap(() => nftContract.balanceOf(userAddress)),
    map((tokenBalance) => tokenBalance.toNumber()),
    retry()
  );
};

export const getTokenTotalSupply$ = (address: string) => {
  const nftContract = CoralNftV1__factory.connect(address, avalancheRpcProvider);

  return newBlock$.pipe(
    startWith(nftContract.totalSupply()),
    switchMap(() => nftContract.totalSupply()),
    map((tokenBalance) => tokenBalance.toNumber()),
    retry()
  );
};
