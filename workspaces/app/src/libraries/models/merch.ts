import { Collection } from './collection';
import { NullableString } from './types';
import { User } from './user';

export const MERCH_OPTIONS = {
  size: ['sm', 'md', 'lg'] as const,
  color: ['black', 'white'] as const,
};

type MerchOptionsMap = typeof MERCH_OPTIONS;

export type MerchOptionType = keyof MerchOptionsMap;

export type MerchOptionTypes = MerchOptionType[];

interface MerchOption<T extends MerchOptionType> {
  type: Extract<MerchOptionType, T>;
  option: MerchOptionsMap[T][number];
}
type SizeOption = MerchOption<'size'>;
type ColorOption = MerchOption<'color'>;

export type MerchOptions = Array<SizeOption | ColorOption>;

type MerchOrderStatus = 'pending' | 'confirmed' | 'rejected' | 'fulfilled';

export interface MerchOrder {
  shippingInfoId: string;
  userId: User['id'];
  collectionId: Collection['id'];
  options: MerchOptions | null;
  timestamp: string;
  status: MerchOrderStatus;
  transactionHash: NullableString;
}
