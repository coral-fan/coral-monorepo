import { Asset } from '../asset';
import { Collection } from '../collection';
import { User } from '../user';

type Status = 'pending' | 'completed' | 'rejected';

export interface Metadata {
  stripePaymentIntentId?: string;
  merchOrderId?: string;
}

export interface PurchaseData {
  userId: User['id'];
  collectionId: Collection['id'];
  status: Status;
  transactionHash: null | string;
  assetId: null | Asset['id'];
  timestamp: string;
  metadata: null | Metadata;
}
