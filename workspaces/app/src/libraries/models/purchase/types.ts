import { Collection } from '../collection';
import { User } from '../user';

type Status = 'pending' | 'completed' | 'rejected';

export interface ShippingInformation {
  firstName: string;
  lastName: string;
  address: string;
  fulfilled: boolean;
}

export interface Metadata {
  stripePaymentIntentId?: string;
  // shippingInformation?: ShippingInformation;
}

export interface PurchaseData {
  userId: User['id'];
  collectionId: Collection['id'];
  status: Status;
  transactionHash: null | string;
  assetId: null | string;
  metadata: null | Metadata;
}
