import { Artist, ArtistData } from '../artist';
import { NullableString } from '../types';

export type CollectionType = 'video' | 'music' | 'stream' | 'merch' | 'all_access';

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
  artistId: Artist['id'];
  imageUrl: string;
  maxSupply: number;
  type: CollectionType;
  price: number;
  dropTime: string;
  description: string;
  details: Details;
  gatedContent: GatedContent;
  maxMintablePerWallet: number;
}

export interface Collection extends Omit<CollectionData, 'artistId'> {
  // id = nft smart contract address
  id: string;
  artistId: Artist['id'];
  artistName: ArtistData['name'];
  artistProfilePhoto: ArtistData['profilePhoto'];
}
