export interface Collection {
  id: string;
  type: 'access' | 'event';
  price: number;
  priceUnit: 'avax' | 'usd';
  dropDate: Date;
  description: string;
  details: string[];
}

// number of items inside collection
// artist address
