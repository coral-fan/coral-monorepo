import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';

// application consts
export const COOKIE_OPTIONS = {
  path: '/',
};

export const ID_TOKEN_KEY = 'id_token';

export const SERVER_ENVIRONMENT = process.env.NODE_ENV;

if (!process.env.NEXT_PUBLIC_ENV) {
  throw Error(getEnvironmentVariableErrorMessage('ENV'));
}

export const CLIENT_ENVIRONMENT = process.env.NEXT_PUBLIC_ENV;

export const CORAL_API_ENDPOINT = '/api';

const CHAIN_ID_HEX = CLIENT_ENVIRONMENT === 'production' ? '0xa86a' : '0xa869';

export const AVALANCHE = {
  CHAIN_ID: {
    HEX: CHAIN_ID_HEX,
    INT: parseInt(CHAIN_ID_HEX),
  },
  ...(CLIENT_ENVIRONMENT === 'production'
    ? {
        CHAIN_NAME: 'Avalanche Mainnet C-Chain',
        RPC_URL: 'https://api.avax.network/ext/bc/C/rpc',
        BLOCK_EXPLORER_URL: 'https://snowtrace.io',
      }
    : {
        CHAIN_NAME: 'Avalanche FUJI C-Chain',
        RPC_URL: 'https://api.avax-test.network/ext/bc/C/rpc',
        BLOCK_EXPLORER_URL: 'https://testnet.snowtrace.io',
      }),
};

export const SITE_MAP = {
  TERMS_OF_SERVICE: ['Terms of Service', '/terms-of-service'],
  PRIVACY_POLICY: ['Privacy Policy', '/privacy-policy'],
  INSTAGRAM: ['Instagram', 'https://www.instagram.com/coral_fan/'],
  TWITTER: ['Twitter', 'https://twitter.com/coral__fan'],
  HOME: ['Home', '/'],
};

export const SITE_LINKS = Object.entries(SITE_MAP).reduce(
  (links, [key, value]) => ({ ...links, [key]: value[1] }),
  {}
) as Record<keyof typeof SITE_MAP, string>;

export const SIGN_UP_CAMPAIGN_MAX_OPENINGS = 250;

/*
Transaction Fee
*/
const BASE_TRANSACTION_FEE = 0.05;
const CHARGE_AVAX_TRANSACTION_FEE = false;
const CHARGE_CC_TRANSACTION_FEE = false;

export const AVAX_TRANSACTION_FEE = CHARGE_AVAX_TRANSACTION_FEE ? BASE_TRANSACTION_FEE : 0;
export const CC_TRANSACTION_FEE = CHARGE_CC_TRANSACTION_FEE ? BASE_TRANSACTION_FEE : 0;
