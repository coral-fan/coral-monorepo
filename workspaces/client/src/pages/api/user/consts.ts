import { PrivateUserDataProperties, UserProperties } from './types';

export const USER_PROPERTIES = new Set<UserProperties>([
  'assets',
  'notifications',
  'profilePhoto',
  'username',
]);
export const PRIVATE_USER_DATA_PROPERTIES = new Set<PrivateUserDataProperties>([
  'creditCardInformation',
  'email',
]);
