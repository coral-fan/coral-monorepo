import { Artist, ArtistData } from '../artist';

export type CollectionType = 'video' | 'music' | 'event' | 'merch';

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
  // id = nft smart contract address
  id: string;
  name: string;
  /* blockchain data index cache */
  artistRef: FirebaseFirestore.DocumentReference<ArtistData>;
  imageUrl: string;
  maxMintable: number;
  /* */
  type: CollectionType;
  price: number;
  dropDate: string;
  description: string;
  details: Details;
  gatedContent: GatedContent;
}

export interface Collection extends Omit<CollectionData, 'artistRef'> {
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
}
