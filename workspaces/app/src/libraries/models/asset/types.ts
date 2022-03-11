import { Artist } from '../artist';
import { Collection } from '../collection';
import { User } from '../user';

// AssetData is data returned from db, aka off chain
export interface AssetData {
  id: number;
  collectionId: string;
}

// owner is derived from on chain data
export interface Asset {
  id: AssetData['id'];
  collectionName: Collection['name'];
  // image url could be a single image or an unique image for a generative NFT
  imageUrl: string;
  type: Collection['type'];
  artistName: Artist['name'];
  artistProfilePhoto: Artist['profilePhoto'];
  collectionDescription: Collection['description'];
  collectionDetails: Collection['details'];
  ownerUsername: User['username'];
  ownerAddress: User['id'];
  ownerProfilePhoto: User['profilePhoto'];
}

// TODO: we will eventually need to index transaction history
