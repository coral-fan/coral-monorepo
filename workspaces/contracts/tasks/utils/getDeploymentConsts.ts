import { config } from 'dotenv';
config();

/*
API Keys for the Deployer Relay. This Relay deploys our NFT contracts and is the owner
of the contract until ownership is transferred to the Multi-Sig.
*/
const DEPLOYER_RELAY_API_KEY_FUJI = process.env.DEPLOYER_RELAY_API_KEY_FUJI;
const DEPLOYER_RELAY_SECRET_KEY_FUJI = process.env.DEPLOYER_RELAY_SECRET_KEY_FUJI;

//TODO: Create Deployer Relays on Mainnet and add API keys to .env
const DEPLOYER_RELAY_API_KEY_MAINNET = process.env.DEPLOYER_RELAY_API_KEY_MAINNET;
const DEPLOYER_RELAY_SECRET_KEY_MAINNET = process.env.DEPLOYER_RELAY_SECRET_KEY_MAINNET;

/*
OpenZeppelin Defender Team API keys manage the Sentinels. We use them to add new contract
addresses to the Sentinels listening to mint and transfer events.
*/
const DEFENDER_TEAM_API_KEY = process.env.DEFENDER_TEAM_API_KEY;
const DEFENDER_TEAM_SECRET_KEY = process.env.DEFENDER_TEAM_SECRET_KEY;

const CONTRACT_NAME = process.env.CONTRACT_NAME;

/*
Images and metadata are uploaded via an nft.storage API.
*/
const NFT_STORAGE_KEY = process.env.NFT_STORAGE_API_KEY;

/*
The Payment Relay Address manages credit card mints. This Relay signs the relayMint
transaction called by our frontend. Only this address can call relayMint. The deploy script 
adds this address to the list of allowed relay mint addresses that can make this call.
*/
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

/*
Sentinels listen to relayMint and transfer events, sending events to our webhooks
that manage indexing and payment captures.
*/
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

export const getDeploymentConsts = (network: Network) => {
  if (!CONTRACT_NAME || !NFT_STORAGE_KEY || !DEFENDER_TEAM_API_KEY || !DEFENDER_TEAM_SECRET_KEY) {
    throw MISSING_ENV_VARIABLE;
  }

  /*
  These environment variables are the same regardless of network.
  */
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
