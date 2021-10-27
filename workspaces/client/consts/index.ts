export const IS_OPEN_LOGIN_PENDING = 'is_open_login_pending';

export const AVALANCHE = {
  CHAIN_ID: process.env.NEXT_PUBLIC_AVALANCHE_CHAIN_ID ?? '0xa869',
  CHAIN_NAME: process.env.NEXT_PUBLIC_AVALANCHE_CHAIN_NAME ?? 'Avalanche FUJI C-Chain',
  RPC_URL: process.env.AVALANCHE_RPC_URL ?? 'https://api.avax-test.network/ext/bc/C/rpc',
  BLOCK_EXPLORER_URL:
    process.env.NEXT_PUBLIC_AVALANCHE_BLOCK_EXPLORER_URL ??
    'https://cchain.explorer.avax-test.network/',
};
