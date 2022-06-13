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

/*
Sentinels listen to relayMint and transfer events, sending events to our webhooks
that manage indexing and payment captures.
*/
const SENTINEL_ID_TRANSFER_IN_PERSON_FUJI = process.env.SENTINEL_ID_TRANSFER_IN_PERSON_FUJI;
const SENTINEL_ID_RELAY_MINT_FUJI = process.env.SENTINEL_ID_RELAY_MINT_FUJI;
const SENTINEL_ID_TRANSFER_FUJI = process.env.SENTINEL_ID_TRANSFER_FUJI;

const SENTINEL_ID_TRANSFER_IN_PERSON_MAINNET = process.env.SENTINEL_ID_TRANSFER_IN_PERSON_MAINNET;
const SENTINEL_ID_RELAY_MINT_MAINNET = process.env.SENTINEL_ID_RELAY_MINT_MAINNET;
const SENTINEL_ID_TRANSFER_MAINNET = process.env.SENTINEL_ID_TRANSFER_MAINNET;

const AVAX_USD_PRICEFEED_FUJI = process.env.AVAX_USD_PRICEFEED_FUJI;
const AVAX_USD_PRICEFEED_MAINNET = process.env.AVAX_USD_PRICEFEED_MAINNET;

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
  avaxUsdPriceFeedAddress: string;
}

type DeploymentType = DeploymentConstBaseObject & DeploymentConstNetworkDependentObject;

export const getDeploymentConsts = (network: Network): DeploymentType => {
  // TODO: Throw more specific error message
  if (!CONTRACT_NAME || !NFT_STORAGE_KEY || !DEFENDER_TEAM_API_KEY || !DEFENDER_TEAM_SECRET_KEY) {
    throw MISSING_ENV_VARIABLE;
  }

  if (network !== 'fuji' && network !== 'mainnet') {
    throw 'Network must be fuji or mainnet';
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
      !DEPLOYER_RELAY_API_KEY_FUJI ||
      !DEPLOYER_RELAY_SECRET_KEY_FUJI ||
      !PAYMENT_RELAY_ADDRESSES_FUJI ||
      !SENTINEL_ID_TRANSFER_IN_PERSON_FUJI ||
      !SENTINEL_ID_RELAY_MINT_FUJI ||
      !SENTINEL_ID_TRANSFER_FUJI ||
      !AVAX_USD_PRICEFEED_FUJI
    ) {
      throw MISSING_ENV_VARIABLE;
    }
    const sentinelIdsFuji: SentinelObject = {
      transferInPerson: SENTINEL_ID_TRANSFER_IN_PERSON_FUJI,
      relayMint: SENTINEL_ID_RELAY_MINT_FUJI,
      transfer: SENTINEL_ID_TRANSFER_FUJI,
    };

    const fujiConstObject: DeploymentConstNetworkDependentObject = {
      deployerRelayApiKey: DEPLOYER_RELAY_API_KEY_FUJI,
      deployerRelaySecretKey: DEPLOYER_RELAY_SECRET_KEY_FUJI,
      paymentRelayAddresses: PAYMENT_RELAY_ADDRESSES_FUJI.split(','),
      sentinelIds: sentinelIdsFuji,
      avaxUsdPriceFeedAddress: AVAX_USD_PRICEFEED_FUJI,
    };
    return {
      ...baseObject,
      ...fujiConstObject,
    };
  } else {
    /*
    MAINNET
    */
    if (
      !DEPLOYER_RELAY_API_KEY_MAINNET ||
      !DEPLOYER_RELAY_SECRET_KEY_MAINNET ||
      !PAYMENT_RELAY_ADDRESSES_MAINNET ||
      !SENTINEL_ID_TRANSFER_IN_PERSON_MAINNET ||
      !SENTINEL_ID_RELAY_MINT_MAINNET ||
      !SENTINEL_ID_TRANSFER_MAINNET ||
      !AVAX_USD_PRICEFEED_MAINNET
    ) {
      throw MISSING_ENV_VARIABLE;
    }
    const sentinelIdsMainnet: SentinelObject = {
      transferInPerson: SENTINEL_ID_TRANSFER_IN_PERSON_MAINNET,
      relayMint: SENTINEL_ID_RELAY_MINT_MAINNET,
      transfer: SENTINEL_ID_TRANSFER_MAINNET,
    };

    const mainnetConstObject: DeploymentConstNetworkDependentObject = {
      deployerRelayApiKey: DEPLOYER_RELAY_API_KEY_MAINNET,
      deployerRelaySecretKey: DEPLOYER_RELAY_SECRET_KEY_MAINNET,
      paymentRelayAddresses: PAYMENT_RELAY_ADDRESSES_MAINNET.split(','),
      sentinelIds: sentinelIdsMainnet,
      avaxUsdPriceFeedAddress: AVAX_USD_PRICEFEED_MAINNET,
    };
    return {
      ...baseObject,
      ...mainnetConstObject,
    };
  }
};
