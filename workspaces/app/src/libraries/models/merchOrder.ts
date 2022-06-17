import { Collection } from './collection';
import { User } from './user';

export const clothingSizeOptions = ['sm', 'md', 'lg'] as const;

// id is same as collection id
interface ClothingOptions {
  size: typeof clothingSizeOptions;
}
type MerchOrderStatus = 'pending' | 'confirmed' | 'fulfilled';

// id is transaction hash
export interface MerchOrder {
  shippingInfoId: string;
  userId: User['id'];
  collectionId: Collection['id'];
  merchId: string;
  options: ClothingOptions | null;
  status: MerchOrderStatus;
}
