import { Artist } from '../artist';

export type CollectionType = 'music' | 'event' | 'merch';

export interface GatedEvent {
  type: 'event';
  id: string;
}
export interface GatedUrl {
  type: 'url';
  url: string;
}

export type GatedContent = GatedUrl | GatedEvent | null;

export interface CollectionData {
  // id = nft smart contract address
  id: string;
  name: string;
  /* blockchain data index cache */
  artistId: string;
  imageUrl: string;
  maxMintable: number;
  /* */
  type: CollectionType;
  price: number;
  dropDate: string;
  description: string;
  details: string[] | null;
  gatedContent: GatedContent;
}

export interface Collection extends Omit<CollectionData, 'artistId'> {
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
}
