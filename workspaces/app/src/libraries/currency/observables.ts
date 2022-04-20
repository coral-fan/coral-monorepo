import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE, SERVER_ENVIRONMENT } from 'consts';
import { ethers } from 'ethers';
import { filter, forkJoin, from, map, merge, of, timer } from 'rxjs';
import { AggregatorV3InterfaceABI__factory } from 'libraries/blockchain/contracts';
import { AVAX_USD_PAIR_ADDRESS } from './consts';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

const avaxUsdPairAddress =
  SERVER_ENVIRONMENT === 'production'
    ? AVAX_USD_PAIR_ADDRESS.C_CHAIN
    : AVAX_USD_PAIR_ADDRESS.FUJI_TESTNET;

export type CurrencyType = 'usd' | 'avax';

export const currencyPairs = ['avax_usd'] as const;

export type CurrencyPair = typeof currencyPairs[number];

const CurrencyPairDictionary: Record<CurrencyPair, string> = {
  avax_usd: avaxUsdPairAddress,
};

export const getCurrencyPairPrice$ = (pair: CurrencyPair) => {
  const address = CurrencyPairDictionary[pair];
  const priceFeed = AggregatorV3InterfaceABI__factory.connect(address, avalancheRpcProvider);

  return merge(
    of({ exchangeRate: 0, loading: true }),
    forkJoin({
      timer: timer(1200),
      roundData: from(priceFeed.latestRoundData()),
      decimals: from(priceFeed.decimals()),
    }).pipe(
      filter((results) => results.roundData !== undefined && results.decimals !== undefined),
      map(({ roundData, decimals }) => ethers.utils.formatUnits(roundData.answer, decimals)),
      map((priceString) => parseFloat(priceString)),
      map((data) => {
        return {
          exchangeRate: data,
          loading: false,
        };
      })
    )
  );
};
