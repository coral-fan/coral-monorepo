import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE, CLIENT_ENVIRONMENT } from 'consts';
import { ethers } from 'ethers';
import { distinctUntilChanged, from, map, retry, startWith, switchMap, withLatestFrom } from 'rxjs';
import {
  ChainLinkOracleAggregatorV3__factory,
  ChainLinkOracleAggregatorV3,
  CoralNftV1__factory,
} from '@coral/contracts';
import { AVAX_USD_PAIR_ADDRESS } from './consts';
import { newBlock$ } from '../observables';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

const avaxUsdPairAddress =
  AVAX_USD_PAIR_ADDRESS[CLIENT_ENVIRONMENT === 'production' ? 'C_CHAIN' : 'FUJI_TESTNET'];

export type CurrencyType = 'usd' | 'avax';

const currencyPairDictionary = {
  avax_usd: avaxUsdPairAddress,
};

type CurrencyPair = keyof typeof currencyPairDictionary;

const getRoundData$ = (priceFeed: ChainLinkOracleAggregatorV3) => from(priceFeed.latestRoundData());

export const getCurrencyPairPrice$ = (pair: CurrencyPair) => {
  const address = currencyPairDictionary[pair];
  const priceFeed = ChainLinkOracleAggregatorV3__factory.connect(address, avalancheRpcProvider);

  const decimals$ = from(priceFeed.decimals());

  return newBlock$.pipe(
    startWith(getRoundData$(priceFeed)),
    switchMap(() => getRoundData$(priceFeed)),
    withLatestFrom(decimals$),
    map(([roundData, decimals]) => ethers.utils.formatUnits(roundData.answer, decimals)),
    map((priceString) => parseFloat(priceString)),
    distinctUntilChanged()
    // retry()
  );
};

export const getAvaxTokenPrice$ = (collectionId: string) => {
  const nftContract = CoralNftV1__factory.connect(collectionId, avalancheRpcProvider);

  return newBlock$.pipe(
    startWith(nftContract.getTokenPriceInAvax()),
    switchMap(() => nftContract.getTokenPriceInAvax()),
    map((price) => ethers.utils.formatEther(price)),
    map((priceString) => parseFloat(priceString)),
    distinctUntilChanged()
    // retry()
  );
};
