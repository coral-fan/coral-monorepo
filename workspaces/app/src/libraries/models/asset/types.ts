import { Collection, CollectionData } from '../collection';
import { PublicUserData, User } from '../user';

// owner is derived from on chain data
export interface Asset {
  id: number;
  contractAddress: Collection['id'];
  collectionName: CollectionData['name'];
  // image url could be a single image or an unique image for a generative NFT
  imageUrl: string;
  type: CollectionData['type'];
  gatedContent: CollectionData['gatedContent'];
  creatorName: Collection['creatorName'];
  creatorProfilePhoto: Collection['creatorProfilePhoto'];
  artistId: Collection['artistId'];
  collectionDescription: CollectionData['description'];
  collectionDetails: CollectionData['details'];
  ownerUsername: PublicUserData['username'];
  ownerAddress: User['id'];
  ownerType: PublicUserData['type'];
  ownerProfilePhoto: PublicUserData['profilePhoto'];
}
