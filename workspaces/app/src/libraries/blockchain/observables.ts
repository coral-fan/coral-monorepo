import { ERC721__factory } from '@coral/contracts';
import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE } from 'consts';
import {
  fromEvent,
  startWith,
  Observable,
  switchMap,
  map,
  retry,
  distinctUntilChanged,
} from 'rxjs';
import { getTokenOwner, getTokenTotalSupply } from './utils';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const newBlock$ = (fromEvent(avalancheRpcProvider, 'block') as Observable<number>).pipe(
  retry()
);

export const getTokenOwner$ = (collectionAddress: string, assetId: number) =>
  newBlock$.pipe(
    startWith(getTokenOwner(collectionAddress, assetId)),
    switchMap(() => getTokenOwner(collectionAddress, assetId)),
    distinctUntilChanged(),
    retry()
  );

export const getUserTokenBalance$ = (collectionAddress: string, userAddress: string) => {
  const nftContract = ERC721__factory.connect(collectionAddress, avalancheRpcProvider);

  return newBlock$.pipe(
    startWith(nftContract.balanceOf(userAddress)),
    switchMap(() => nftContract.balanceOf(userAddress)),
    map((tokenBalance) => tokenBalance.toNumber()),
    distinctUntilChanged(),
    retry()
  );
};

export const getTokenTotalSupply$ = (address: string) => {
  return newBlock$.pipe(
    switchMap(() => getTokenTotalSupply(address)),
    distinctUntilChanged(),
    retry()
  );
};
