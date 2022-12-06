import { getEnvironmentVariableErrorMessage } from 'libraries/utils/errors';

// application consts
export const COOKIE_OPTIONS = {
  path: '/',
};

export const ID_TOKEN_KEY = 'id_token';

export const SERVER_ENVIRONMENT = process.env.NODE_ENV;

// checks npm_package_name to allow code in app to be ran in contracts workspace where NEXT_PUBLIC_ENV won't be defined
if (!process.env.NEXT_PUBLIC_ENV && process.env.npm_package_name === 'app') {
  throw Error(getEnvironmentVariableErrorMessage('NEXT_PUBLIC_ENV'));
}

export const CLIENT_ENVIRONMENT = process.env.NEXT_PUBLIC_ENV;

const ALCHEMY_ENDPOINT = process.env.ALCHEMY_ENDPOINT;

export const CORAL_API_ENDPOINT = '/api';

const CHAIN_ID_HEX = CLIENT_ENVIRONMENT === 'production' ? '0xa86a' : '0xa869';
const CHAIN_ID_HEX_ETH = CLIENT_ENVIRONMENT === 'production' ? '0x1' : '0x5';

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

export const ETHEREUM = {
  CHAIN_ID: {
    HEX: CHAIN_ID_HEX_ETH,
    INT: parseInt(CHAIN_ID_HEX_ETH),
  },
  ...(CLIENT_ENVIRONMENT === 'production'
    ? {
        CHAIN_NAME: 'Ethereum Mainnet',
        RPC_URL: ALCHEMY_ENDPOINT,
        BLOCK_EXPLORER_URL: 'https://etherscan.io',
      }
    : {
        CHAIN_NAME: 'Ethereum Goerli Testnet',
        RPC_URL: ALCHEMY_ENDPOINT,
        BLOCK_EXPLORER_URL: 'https://goerli.etherscan.io/',
      }),
};

export const SITE_MAP = {
  TERMS_OF_USE: ['Terms of Use', '/terms-of-use'],
  PRIVACY_POLICY: ['Privacy Policy', '/privacy-policy'],
  INSTAGRAM: ['Instagram', 'https://www.instagram.com/coral_fan/'],
  TWITTER: ['Twitter', 'https://twitter.com/coral__fan'],
  YOUTUBE: ['Youtube', 'https://www.youtube.com/channel/UCaq1Ap2bA-63VrVUsdiNKvA'],
  DISCORD: ['Discord', 'https://discord.gg/qYbRMd7BGd'],
  HOME: ['Home', '/'],
  CORAL_EDITORIAL: ['Coral Editorial', 'https://editorial.coral.fan/'],
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

export const POINTS_AVAX_VALUE = 100; // 100 points per 1 AVAX

// TODO: Replace with actual contract
export const PINDER_NFT_CONTRACT_ADDRESS = '0x7cb1cC76d08ec8F079697838e1463E1585eFeaE3';
export const PINDER_MULTIPLE = 2;

export const TAYLA_PARX_ALL_ACCESS_PASS_CONTRACT_ADDRESS =
  '0xcB846098C5f6a86D9775a183F80aFdF174eD1171';
