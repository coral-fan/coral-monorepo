import { PrivateUserDataProperties, UserProperties } from './types';

export const USER_PROPERTIES = new Set<UserProperties>([
  'assets',
  'notifications',
  'profilePhoto',
  'type',
  'username',
]);
export const PRIVATE_USER_DATA_PROPERTIES = new Set<PrivateUserDataProperties>([
  'creditCardInformation',
  'email',
  'doesOptIntoEmailMarketing',
]);
