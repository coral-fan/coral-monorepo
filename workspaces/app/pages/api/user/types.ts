import { PrivateUserData, PublicUserData } from 'libraries/models';

export type UserProperties = keyof PublicUserData;
export type PrivateUserDataProperties = keyof PrivateUserData;
