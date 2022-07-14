import { Artist, ArtistData } from '../artist';
import { MerchOptionTypes } from '../merch';
import { NullableString } from '../types';

export type CollectionType = 'video' | 'music' | 'stream' | 'merch' | 'all_access' | 'ticket';

export interface GatedStream {
  type: 'stream';
  id: NullableString;
}

export interface GatedUrl {
  type: 'url';
  url: string;
}

export type GatedContent = GatedUrl | GatedStream | null;
export type Details = string[] | null;

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
  gatedContent: GatedContent;
  maxMintablePerWallet: number;
  // undefined to allow flexibility in Firestore
  merchOptionTypes?: MerchOptionTypes;
  accessGrantingTokenAddresses: Collection['id'][] | null;
}

export interface Collection extends CollectionData {
  // id = nft smart contract address
  id: string;
  creatorName: ArtistData['name'];
  creatorProfilePhoto: ArtistData['profilePhoto'];
}
