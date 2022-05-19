import { Collection, CollectionData } from '../collection';
import { PublicUserData } from '../user';

export interface AssetData {
  id: number;
  contractAddress: CollectionData['id'];
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
  ownerAddress: PublicUserData['id'];
  ownerType: PublicUserData['type'];
  ownerProfilePhoto: PublicUserData['profilePhoto'];
}

// TODO: we will eventually need to index transaction history
