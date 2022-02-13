import { ID_TOKEN_KEY } from 'consts';
import { parseCookies } from 'nookies';

export const getToken = (context?: Parameters<typeof parseCookies>[0]): string | null =>
  parseCookies(context)[ID_TOKEN_KEY] ?? null;

export const getAuthenticationMessage = (nonce: number) =>
  `Hi from Coral!\n
   Sign this message to prove you own this wallet to login. This won't cost any AVAX.\n
   As a security measure, here's a nonce: ${nonce}`;
