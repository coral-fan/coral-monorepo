// AssetData is data returned from db, aka off chain
export interface AssetData {
  id: number;
  collectionId: string;
}

// userId is derived from on cnain data
export type Asset = AssetData & {
  userId: number;
};

// TODO: we will eventually need to index transaction history
