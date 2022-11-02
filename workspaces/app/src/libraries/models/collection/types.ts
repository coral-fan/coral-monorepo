import { Artist, ArtistData } from '../artist';
import { ReferralCampaignData } from '../earn';
import { NullableString } from '../types';

export type CollectionType = 'video' | 'music' | 'stream' | 'merch' | 'all_access' | 'ticket';

export interface GatedContent {
  type: 'stream' | 'url';
  value: NullableString;
}

export type Details = string[] | null;
export interface MerchOptions {
  type: string;
  values: string[];
  quantities: number[];
  subOptions?: MerchOptions[];
}

export interface CollectionData {
  name: string;
  /* blockchain data index cache */
  artistId?: Artist['id'];
  creatorName?: ArtistData['name'];
  creatorProfilePhoto?: ArtistData['profilePhoto'];
  imageUrl: string;
  maxSupply: number;
  type: CollectionType;
  price: number;
  dropTime: string;
  description: string;
  details: Details;
  gatedContent?: GatedContent;
  maxMintablePerWallet: number;
  // undefined to allow flexibility in Firestore
  merchOptions?: MerchOptions;
  accessGrantingTokenAddresses: Collection['id'][] | null;
  activeCampaign?: string;
}

export interface Collection extends CollectionData {
  // id = nft smart contract address
  id: string;
  creatorName: ArtistData['name'];
  creatorProfilePhoto: ArtistData['profilePhoto'];
  referralCampaign?: ReferralCampaignData;
}

export type PartialCollection = Omit<
  Collection,
  'gatedContent' | 'details' | 'description' | 'accessGrantingTokenAddresses'
>;
