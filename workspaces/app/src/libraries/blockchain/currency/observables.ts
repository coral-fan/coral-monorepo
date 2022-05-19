import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE, SERVER_ENVIRONMENT } from 'consts';
import { ethers } from 'ethers';
import {
  distinctUntilChanged,
  forkJoin,
  from,
  fromEvent,
  map,
  Observable,
  startWith,
  switchMap,
} from 'rxjs';
import {
  ChainLinkOracleAggregatorV3__factory,
  ChainLinkOracleAggregatorV3,
} from '@coral/contracts';
import { AVAX_USD_PAIR_ADDRESS } from './consts';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

const avaxUsdPairAddress =
  AVAX_USD_PAIR_ADDRESS[SERVER_ENVIRONMENT === 'production' ? 'C_CHAIN' : 'FUJI_TESTNET'];

export type CurrencyType = 'usd' | 'avax';

const currencyPairDictionary = {
  avax_usd: avaxUsdPairAddress,
};

type CurrencyPair = keyof typeof currencyPairDictionary;

const newBlock$ = fromEvent(avalancheRpcProvider, 'block') as Observable<number>;

const getPriceFeedData$ = (priceFeed: ChainLinkOracleAggregatorV3) =>
  forkJoin({
    roundData: from(priceFeed.latestRoundData()),
    decimals: from(priceFeed.decimals()),
  });

export const getCurrencyPairPrice$ = (pair: CurrencyPair) => {
  const address = currencyPairDictionary[pair];
  const priceFeed = ChainLinkOracleAggregatorV3__factory.connect(address, avalancheRpcProvider);

  return newBlock$.pipe(
    startWith(getPriceFeedData$(priceFeed)),
    switchMap(() => getPriceFeedData$(priceFeed)),
    map(({ roundData, decimals }) => ethers.utils.formatUnits(roundData.answer, decimals)),
    map((priceString) => parseFloat(priceString)),
    distinctUntilChanged()
  );
};
