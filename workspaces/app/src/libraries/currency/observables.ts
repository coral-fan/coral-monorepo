import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE, SERVER_ENVIRONMENT } from 'consts';
import { ethers } from 'ethers';
import { filter, forkJoin, from, map, merge, of, timer } from 'rxjs';
import { AggregatorV3InterfaceABI__factory } from 'libraries/blockchain/contracts';
import { CHAINLINK_AVAX_USD, CHAINLINK_AVAX_USD_TESTNET } from './consts';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);
const chainlinkAvaxUsdAddress =
  SERVER_ENVIRONMENT === 'production' ? CHAINLINK_AVAX_USD : CHAINLINK_AVAX_USD_TESTNET;
export type CurrencyType = 'usd' | 'avax';
export const currencyPairs = ['avax_usd'] as const;

export type CurrencyPair = typeof currencyPairs[number];

const CurrencyPairDictionary: Record<CurrencyPair, string> = {
  avax_usd: chainlinkAvaxUsdAddress,
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
