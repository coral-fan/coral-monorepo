import { Collection } from '../collection';
import { User } from '../user';

// AssetData is data returned from db, aka off chain
export interface AssetData {
  id: number;
  collectionId: string;
}

// userId is derived from on chain data
export type Asset = Pick<AssetData, 'id'> &
  Pick<Collection, 'imageUrl' | 'type' | 'description' | 'details'> &
  Pick<User, 'profilePhoto' | 'username'>;

// TODO: we will eventually need to index transaction history
