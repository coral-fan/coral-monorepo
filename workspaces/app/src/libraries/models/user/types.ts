import { Asset } from '../asset';
import { Notification } from '../notification';
import { NullableString } from '../types';

export interface CreditCardInformation {
  firstName: string;
  lastName: string;
  cardNumber: number;
  Expiration: string;
  CVV: number;
  billingAddress: {
    address: string;
    zipCode: number;
    city: string;
  };
}

export type OffsetPercentages = [number, number];

export interface Photo {
  src: string;
  offsetPercentages: OffsetPercentages;
  scale: number;
}

export interface SocialHandles {
  twitter: NullableString;
  instagram: NullableString;
  spotify: NullableString;
  tiktok: NullableString;
  soundcloud: NullableString;
  discogs: NullableString;
}

export type UserType = 'fan' | 'super_fan' | 'artist';

export interface PublicUserData {
  id: string;
  username: string;
  type: UserType;
  profilePhoto: Photo;
  bio: NullableString;
  socialHandles: SocialHandles;
  notifications: Notification[];
  assets: Asset[];
}

export interface PrivateUserData {
  email: NullableString;
  doesOptIntoMarketing: boolean;
  creditCardInformation: CreditCardInformation | null;
}

//  id = wallet address
export type User = PublicUserData & Partial<PrivateUserData>;

/*
At Least One Type implementation from:
https://stackoverflow.com/questions/48230773/how-to-create-a-partial-like-that-requires-a-single-property-to-be-set/48244432
*/
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type IncomingUserData = AtLeastOne<User>;

export type IsUserSigningUpData = {
  isSigningUp: boolean;
};
