import { config } from 'dotenv';
config();

const DEPLOYER_RELAY_API_KEY_FUJI = process.env.DEPLOYER_RELAY_API_KEY_FUJI;
const DEPLOYER_RELAY_SECRET_KEY_FUJI = process.env.DEPLOYER_RELAY_SECRET_KEY_FUJI;
const DEPLOYER_RELAY_API_KEY_MAINNET = process.env.DEPLOYER_RELAY_API_KEY_MAINNET;
const DEPLOYER_RELAY_SECRET_KEY_MAINNET = process.env.DEPLOYER_RELAY_SECRET_KEY_MAINNET;
const DEFENDER_TEAM_API_KEY = process.env.DEFENDER_TEAM_API_KEY;
const DEFENDER_TEAM_SECRET_KEY = process.env.DEFENDER_TEAM_SECRET_KEY;
const CONTRACT_NAME = process.env.CONTRACT_NAME;
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY;
const PAYMENT_RELAY_ADDRESSES_FUJI = process.env.PAYMENT_RELAY_ADDRESSES_FUJI;
const PAYMENT_RELAY_ADDRESSES_MAINNET = process.env.PAYMENT_RELAY_ADDRESSES_MAINNET;

const MISSING_ENV_VARIABLE =
  'Missing an environment variable, please consult README and ensure all keys are present';

export type Network = 'fuji' | 'mainnet';

interface SentinelObject {
  transferInPerson: string;
  relayMint: string;
  transfer: string;
}

interface DeploymentConstBaseObject {
  contractName: string;
  nftStorageKey: string;
  defenderTeamApiKey: string;
  defenderTeamSecretKey: string;
}

interface DeploymentConstNetworkDependentObject {
  deployerRelayApiKey: string;
  deployerRelaySecretKey: string;
  paymentRelayAddresses: string[];
  sentinelIds: SentinelObject;
}

const SENTINEL_IDS_FUJI: SentinelObject = {
  transferInPerson: '7b0b2398-31d7-4c93-a560-efb85e541ce4',
  relayMint: 'b89eefbf-5f44-466c-9c7f-fe9251db0f6a',
  transfer: 'f4302190-7921-4b82-89c9-bab6423c0c88',
};

const SENTINEL_IDS_MAINNET: SentinelObject = {
  transferInPerson: 'tbd',
  relayMint: 'tbd',
  transfer: 'tbd',
};

export const getConsts = (network: Network) => {
  if (!CONTRACT_NAME || !NFT_STORAGE_KEY || !DEFENDER_TEAM_API_KEY || !DEFENDER_TEAM_SECRET_KEY) {
    throw MISSING_ENV_VARIABLE;
  }

  const baseObject: DeploymentConstBaseObject = {
    contractName: CONTRACT_NAME,
    nftStorageKey: NFT_STORAGE_KEY,
    defenderTeamApiKey: DEFENDER_TEAM_API_KEY,
    defenderTeamSecretKey: DEFENDER_TEAM_SECRET_KEY,
  };

  /*
  FUJI
  */
  if (network === 'fuji') {
    if (
      DEPLOYER_RELAY_API_KEY_FUJI &&
      DEPLOYER_RELAY_SECRET_KEY_FUJI &&
      PAYMENT_RELAY_ADDRESSES_FUJI
    ) {
      const fujiConstObject: DeploymentConstNetworkDependentObject = {
        deployerRelayApiKey: DEPLOYER_RELAY_API_KEY_FUJI,
        deployerRelaySecretKey: DEPLOYER_RELAY_SECRET_KEY_FUJI,
        paymentRelayAddresses: PAYMENT_RELAY_ADDRESSES_FUJI.split(','),
        sentinelIds: SENTINEL_IDS_FUJI,
      };
      return {
        ...baseObject,
        ...fujiConstObject,
      };
    } else {
      throw MISSING_ENV_VARIABLE;
    }
  }

  /*
  MAINNET
  */
  if (network === 'mainnet') {
    if (
      DEPLOYER_RELAY_API_KEY_MAINNET &&
      DEPLOYER_RELAY_SECRET_KEY_MAINNET &&
      PAYMENT_RELAY_ADDRESSES_MAINNET
    ) {
      const mainnetConstObject: DeploymentConstNetworkDependentObject = {
        deployerRelayApiKey: DEPLOYER_RELAY_API_KEY_MAINNET,
        deployerRelaySecretKey: DEPLOYER_RELAY_SECRET_KEY_MAINNET,
        paymentRelayAddresses: PAYMENT_RELAY_ADDRESSES_MAINNET.split(','),
        sentinelIds: SENTINEL_IDS_MAINNET,
      };
      return {
        ...baseObject,
        ...mainnetConstObject,
      };
    } else {
      throw MISSING_ENV_VARIABLE;
    }
  }
};
