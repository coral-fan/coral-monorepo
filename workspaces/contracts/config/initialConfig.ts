interface Attribute {
  trait_type: string;
  value: string;
}

interface Contract {
  address: string;
  contractName: string;
  name: string;
  symbol: string;
  usdPricePerToken: number;
  maxSupply: number;
  maxTokensPerWallet: number;
  saleStartTime: number;
  royaltyFeeRecipient: string;
  royaltyFeeNumerator: number;
  description: string;
  tokenURI: string;
  numAttributes: number;
  attributes: Attribute[];
  avaxUsdPriceFeedAddress: string;
  deployedToNetwork: string;
  deployedTransactionHash: string;
}

interface CollectionData {
  artistId: string;
  imageUrl: string;
  type: string;
  dropTime: Date | undefined;
  details: string[];
  gatedContent: {
    type: string;
    value: string | null;
  };
  accessGrantingTokenAddresses: string[] | null;
}

interface Config {
  contract: Contract;
  collectionData: CollectionData;
}
/*
Initial JSON File Config
*/
export const initialConfig: Config = {
  contract: {
    address: '',
    contractName: 'CoralNftV1',
    name: '',
    symbol: '',
    usdPricePerToken: 0,
    maxSupply: 0,
    maxTokensPerWallet: 2,
    saleStartTime: 0,
    royaltyFeeRecipient: '',
    royaltyFeeNumerator: 0,
    description: '',
    tokenURI: '',
    numAttributes: 0,
    attributes: [],
    avaxUsdPriceFeedAddress: '',
    deployedToNetwork: '',
    deployedTransactionHash: '',
  },
  collectionData: {
    artistId: '',
    imageUrl: '',
    type: '',
    dropTime: undefined,
    details: [],
    gatedContent: {
      type: '',
      value: '',
    },
    accessGrantingTokenAddresses: [],
  },
};
