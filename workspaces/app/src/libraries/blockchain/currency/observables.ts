import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE, SERVER_ENVIRONMENT } from 'consts';
import { ethers } from 'ethers';
import { forkJoin, from, map } from 'rxjs';
import { ChainLinkOracleAggregatorV3__factory } from '@coral/contracts';
import { AVAX_USD_PAIR_ADDRESS } from './consts';

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

const avaxUsdPairAddress =
  AVAX_USD_PAIR_ADDRESS[SERVER_ENVIRONMENT === 'production' ? 'C_CHAIN' : 'FUJI_TESTNET'];

export type CurrencyType = 'usd' | 'avax';

const currencyPairDictionary = {
  avax_usd: avaxUsdPairAddress,
};

type CurrencyPair = keyof typeof currencyPairDictionary;

export const getCurrencyPairPrice$ = (pair: CurrencyPair) => {
  const address = currencyPairDictionary[pair];
  const priceFeed = ChainLinkOracleAggregatorV3__factory.connect(address, avalancheRpcProvider);

  return forkJoin({
    roundData: from(priceFeed.latestRoundData()),
    decimals: from(priceFeed.decimals()),
  }).pipe(
    map(({ roundData, decimals }) => ethers.utils.formatUnits(roundData.answer, decimals)),
    map((priceString) => parseFloat(priceString))
  );
};
