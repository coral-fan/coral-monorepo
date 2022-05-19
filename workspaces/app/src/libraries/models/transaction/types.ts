import { CollectionData } from '../collection';
import { PublicUserData } from '../user';

type Status = 'pending' | 'completed' | 'rejected';

export interface TransactionData {
  userId: PublicUserData['id'];
  collectionId: CollectionData['id'];
  status: Status;
  hash: null;
  assetId: null;
}
