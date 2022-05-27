import { Collection } from '../collection';
import { User } from '../user';

type Status = 'pending' | 'completed' | 'rejected';

export interface PurchaseData {
  userId: User['id'];
  collectionId: Collection['id'];
  status: Status;
  hash: null;
  assetId: null;
}
