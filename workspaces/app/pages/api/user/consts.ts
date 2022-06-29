import { PrivateUserDataProperties, UserProperties } from './types';

export const USER_PROPERTIES = new Set<UserProperties>([
  'notifications',
  'profilePhoto',
  'type',
  'username',
  'bio',
  'socialHandles',
]);
export const PRIVATE_USER_DATA_PROPERTIES = new Set<PrivateUserDataProperties>([
  'stripeCustomerId',
  'email',
  'doesOptIntoMarketing',
  'shippingInfoId',
]);
