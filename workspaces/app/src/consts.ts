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

// api consts
if (!process.env.NEXT_PUBLIC_CORAL_API_ENDPOINT) {
  throw Error(getEnvironmentVariableErrorMessage('NEXT_PUBLIC_API_ENDPOINT'));
}

export const CORAL_API_ENDPOINT = process.env.NEXT_PUBLIC_CORAL_API_ENDPOINT;

// avalanche consts
if (!process.env.NEXT_PUBLIC_AVALANCHE_CHAIN_ID) {
  throw Error(getEnvironmentVariableErrorMessage('NEXT_PUBLIC_AVALANCE_CHAIN_ID'));
}
if (!process.env.NEXT_PUBLIC_AVALANCHE_CHAIN_NAME) {
  throw Error(getEnvironmentVariableErrorMessage('NEXT_PUBLIC_AVALANCHE_CHAIN_NAME'));
}
if (!process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL) {
  throw Error(getEnvironmentVariableErrorMessage('NEXT_PUBLIC_AVALANCHE_RPC_URL'));
}
if (!process.env.NEXT_PUBLIC_AVALANCHE_BLOCK_EXPLORER_URL) {
  throw Error(getEnvironmentVariableErrorMessage('NEXT_PUBLIC_AVALANCHE_BLOCK_EXPLORER_URL'));
}

const chainIdHex = process.env.NEXT_PUBLIC_AVALANCHE_CHAIN_ID;

export const AVALANCHE = {
  CHAIN_ID: {
    HEX: chainIdHex,
    INT: parseInt(chainIdHex),
  },
  CHAIN_NAME: process.env.NEXT_PUBLIC_AVALANCHE_CHAIN_NAME,
  RPC_URL: process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL,
  BLOCK_EXPLORER_URL: process.env.NEXT_PUBLIC_AVALANCHE_BLOCK_EXPLORER_URL,
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

export const TRANSACTION_FEE = 0.05;
