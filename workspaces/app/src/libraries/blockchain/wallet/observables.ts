import { JsonRpcProvider } from '@ethersproject/providers';
import { AVALANCHE } from 'consts';
import { ethers } from 'ethers';
import { NullableString } from 'libraries/models';
import { safeRound } from 'libraries/utils/math';
import { from, map, mergeMap, Observable, of, pluck, retry, throwError } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import { COVALENT_API_KEY } from './consts';

const COVALENT_API_BASE_URL = `https://api.covalenthq.com/v1`;

// TODO: should be using test chain id in local dev environment. depends on how sdk works though...
const getCovalentTokenBalanceApiUrl = (chainId: number, walletAddress: string) =>
  `${COVALENT_API_BASE_URL}/${chainId}/address/${walletAddress}/balances_v2/?key=${COVALENT_API_KEY}&nft=true&no-nft-fetch=true`;

interface NftData {
  token_id: string;
}

type TokenType = 'cryptocurrency' | 'stablecoin' | 'nft' | 'dust';

interface TokenData {
  balance: string;
  balance_24: NullableString;
  contract_address: string;
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  last_transferred_at: NullableString;
  logo_url: string;
  nft_data: NftData[];
  quote: number;
  quote_24: number | null;
  quote_rate: number;
  quote_rate_24: number | null;
  supports_erc: string[];
  type: TokenType;
}

interface TokenBalanceData {
  address: string;
  chain_id: number;
  items: TokenData[];
  next_update_at: string;
  pagination: null;
  quote_currency: string;
  updated_at: string;
}

interface CovalentResponse<T> {
  data: T;
  error: false;
  error_message: null;
  error_code: null;
}

const covalentRetryStrategy = <T>(observable: Observable<AjaxResponse<CovalentResponse<T>>>) =>
  observable.pipe(
    mergeMap(({ response, status }) => {
      if (status !== 200) {
        return throwError(() => new Error());
      }
      return of(response.data);
    }),
    retry(5)
  );

const tokenDataArrayToMap = (
  tokenData: TokenData[]
): Record<string, Omit<TokenData, 'contract_address'>> =>
  tokenData.reduce(
    (tokenMap, { contract_address, ...data }) => ({ ...tokenMap, [contract_address]: data }),
    {}
  );

export const getWalletTokenBalances$ = (walletAddress: string) =>
  ajax<CovalentResponse<TokenBalanceData>>(
    `${getCovalentTokenBalanceApiUrl(AVALANCHE.CHAIN_ID.INT, walletAddress)}`
  ).pipe(covalentRetryStrategy);

export const getWalletNfts$ = (walletAddress: string) =>
  getWalletTokenBalances$(walletAddress).pipe(
    pluck('items'),
    map((tokenDataArray) => tokenDataArray.filter(({ type }) => type === 'nft')),
    map(tokenDataArrayToMap)
  );

const avalancheRpcProvider = new JsonRpcProvider(AVALANCHE.RPC_URL);

export const getWalletBalance$ = (address: string) =>
  from(avalancheRpcProvider.getBalance(address)).pipe(
    map((balanceBigInt) => ethers.utils.formatEther(balanceBigInt)),
    map((balanceString) => parseFloat(balanceString)),
    map((balance) => safeRound(balance, 2))
  );
