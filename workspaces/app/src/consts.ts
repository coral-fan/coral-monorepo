import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';

// application consts
export const COOKIE_OPTIONS = {
  path: '/',
};

export const ID_TOKEN_KEY = 'id_token';

// environment variable const
if (!process.env.NODE_ENV) {
  throw Error(getEnvironmentVariableErrorMessage('NODE_ENV'));
}

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

export const AVALANCHE = {
  CHAIN_ID: process.env.NEXT_PUBLIC_AVALANCHE_CHAIN_ID,
  CHAIN_NAME: process.env.NEXT_PUBLIC_AVALANCHE_CHAIN_NAME,
  RPC_URL: process.env.NEXT_PUBLIC_AVALANCHE_RPC_URL,
  BLOCK_EXPLORER_URL: process.env.NEXT_PUBLIC_AVALANCHE_BLOCK_EXPLORER_URL,
};
