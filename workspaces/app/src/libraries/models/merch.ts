import { Collection } from './collection';
import { NullableString } from './types';
import { User } from './user';
export interface MerchOption {
  type: string;
  value: string;
}

type MerchOrderStatus = 'pending' | 'confirmed' | 'rejected' | 'fulfilled';

export interface MerchOrder {
  shippingInfoId: string;
  userId: User['id'];
  collectionId: Collection['id'];
  options?: MerchOption[];
  timestamp: string;
  status: MerchOrderStatus;
  transactionHash: NullableString;
}
