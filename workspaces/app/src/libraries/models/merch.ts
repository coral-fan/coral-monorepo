import { Collection } from './collection';
import { NullableString } from './types';
import { User } from './user';

export interface MerchOrderOption {
  type: string;
  value: string;
}

type MerchOrderStatus = 'pending' | 'confirmed' | 'rejected' | 'fulfilled';

export interface MerchOrder {
  shippingInfoId: string;
  userId: User['id'];
  collectionId: Collection['id'];
  options?: MerchOrderOption[];
  timestamp: string;
  status: MerchOrderStatus;
  transactionHash: NullableString;
}
