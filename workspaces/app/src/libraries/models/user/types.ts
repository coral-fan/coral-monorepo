import { Artist } from '../artist';
import { Asset } from '../asset';
import { Collection } from '../collection';
import { Notification } from '../notification';
import { NullableString, SocialHandles } from '../types';
import { Photo } from '../types';

export type UserType = 'fan' | 'super_fan' | 'artist';

export type ContractAddressToIdMap = Record<Collection['id'], Asset['id']>;

export interface PublicUserData {
  username: string;
  type: UserType;
  profilePhoto: Photo;
  bio: NullableString;
  socialHandles: SocialHandles;
  notifications: Notification[];
  // map of contract address to asset id
  followingArtistIds: Artist['id'][];
}

export interface PrivateUserData {
  email: NullableString;
  doesOptIntoMarketing: boolean;
  stripeCustomerId: NullableString;
}

//  id = wallet address
export interface User
  extends Omit<PublicUserData, 'assets' | 'followingArtistIds'>,
    Partial<PrivateUserData> {
  id: string;
  assets: Asset[];
  followingArtists: Artist[];
}

/*
At Least One Type implementation from:
https://stackoverflow.com/questions/48230773/how-to-create-a-partial-like-that-requires-a-single-property-to-be-set/48244432
*/
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export type IncomingUserData = Omit<AtLeastOne<User>, 'id'>;

export type IsUserSigningUpData = {
  isSigningUp: boolean;
};
