import { Artist, ArtistData } from '../artist';

export type CollectionType = 'video' | 'music' | 'event' | 'merch' | 'all_access';

export interface GatedEvent {
  type: 'event';
  id: string;
}
export interface GatedUrl {
  type: 'url';
  url: string;
}

export type GatedContent = GatedUrl | GatedEvent | null;
export type Details = string[] | null;

export interface CollectionData {
  name: string;
  /* blockchain data index cache */
  artistId: Artist['id'];
  imageUrl: string;
  maxSupply: number;
  type: CollectionType;
  price: number;
  dropDate: string;
  description: string;
  details: Details;
  gatedContent: GatedContent;
}

export interface Collection extends Omit<CollectionData, 'artistId'> {
  // id = nft smart contract address
  id: string;
  artistId: Artist['id'];
  artistName: ArtistData['name'];
  artistProfilePhoto: ArtistData['profilePhoto'];
}
