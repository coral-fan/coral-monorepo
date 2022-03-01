export type CollectionType = 'music' | 'event' | 'merch';

export interface Collection {
  // id = nft smart contract address
  id: string;
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
