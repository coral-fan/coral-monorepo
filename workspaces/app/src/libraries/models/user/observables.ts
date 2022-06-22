import { getAuth } from 'firebase/auth';
import { getCollectionReferenceClientSide, getDocumentData } from 'libraries/firebase';
import { user } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';
import { filter, from, map, mergeMap, startWith } from 'rxjs';
import { PrivateUserData, PublicUserData, User } from './types';
import { getUidClientSide } from './utils';

// client side only
const getFirebaseUser$ = () => {
  const auth = getAuth();
  return user(auth);
};

// client side only
export const getUserUid$ = () =>
  getFirebaseUser$().pipe(
    map((user) => user?.uid),
    startWith(getUidClientSide())
  );

// client side only
export const getUsernames$ = () => {
  const usersCollectionReference = getCollectionReferenceClientSide<PublicUserData>('users');
  return collectionData(usersCollectionReference).pipe(
    map((users) => new Set(users.map((user) => user.username.toLowerCase())))
  );
};

//client side only
export const getPublicUserData$ = (uid: string) => from(getDocumentData<User>('users', uid));

export const getPrivateUserData$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentData<PrivateUserData>('users', uid, 'private', 'data')),
    filter((privateUserData): privateUserData is PrivateUserData => user !== undefined),
    map((privateUserData) => privateUserData)
  );

export const getStripeCustomerId$ = () =>
  getPrivateUserData$().pipe(map((privateUserData) => privateUserData.stripeCustomerId));

export const getShippingInfoId$ = () =>
  getPrivateUserData$().pipe(map((privateUserData) => privateUserData.shippingInfoId));
