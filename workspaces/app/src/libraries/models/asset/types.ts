import { Collection, CollectionData } from '../collection';
import { PublicUserData, User } from '../user';

export interface AssetData {
  id: number;
  contractAddress: Collection['id'];
}
// owner is derived from on chain data
export interface Asset extends AssetData {
  collectionName: CollectionData['name'];
  // image url could be a single image or an unique image for a generative NFT
  imageUrl: string;
  type: CollectionData['type'];
  gatedContent: CollectionData['gatedContent'];
  artistName: Collection['artistName'];
  artistProfilePhoto: Collection['artistProfilePhoto'];
  artistId: Collection['artistId'];
  collectionDescription: CollectionData['description'];
  collectionDetails: CollectionData['details'];
  ownerUsername: PublicUserData['username'];
  ownerAddress: User['id'];
  ownerType: PublicUserData['type'];
  ownerProfilePhoto: PublicUserData['profilePhoto'];
}

// TODO: we will eventually need to index transaction history
