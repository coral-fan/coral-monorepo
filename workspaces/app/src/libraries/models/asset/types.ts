import { Collection } from '../collection';
import { User } from '../user';

export interface AssetData {
  contractAddress: string;
  id: number;
}
// owner is derived from on chain data
export interface Asset {
  id: number;
  contractAddress: Collection['id'];
  collectionName: Collection['name'];
  // image url could be a single image or an unique image for a generative NFT
  imageUrl: string;
  type: Collection['type'];
  gatedContent: Collection['gatedContent'];
  artistName: Collection['artistName'];
  artistProfilePhoto: Collection['artistProfilePhoto'];
  collectionDescription: Collection['description'];
  collectionDetails: Collection['details'];
  ownerUsername: User['username'];
  ownerAddress: User['id'];
  ownerType: User['type'];
  ownerProfilePhoto: User['profilePhoto'];
}

// TODO: we will eventually need to index transaction history
