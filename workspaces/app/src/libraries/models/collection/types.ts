import { Artist } from '../artist';

export type CollectionType = 'music' | 'event' | 'merch';

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
}

export type Collection = Omit<CollectionData, 'id' | 'artistId'> &
  Pick<Artist, 'name' | 'profilePhoto'>;
