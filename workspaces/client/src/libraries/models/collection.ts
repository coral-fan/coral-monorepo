export interface Collection {
  // id = nft smart contract address
  id: string;
  /* blockchain data index cache */
  artistId: string;
  maxMintable: number;
  /* */
  type: 'access' | 'event';
  price: number;
  priceUnit: 'avax' | 'usd';
  dropDate: Date;
  description: string;
  details: string[];
}
