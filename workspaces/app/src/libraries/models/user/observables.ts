import { getAuth } from 'firebase/auth';
import { getCollectionReferenceClientSide, getDocumentData } from 'libraries/firebase';
import { user } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';
import { filter, map, mergeMap, startWith, tap } from 'rxjs';
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
export const getUser$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentData<User>('users', uid)),
    filter((user): user is User => user !== undefined),
    map((user) => user)
  );

export const getStripeCustomerId$ = () =>
  getUserUid$().pipe(
    filter((uid): uid is string => uid !== undefined),
    mergeMap((uid) => getDocumentData<PrivateUserData>('users', uid, 'private', 'data')),
    filter((privateUserData): privateUserData is PrivateUserData => user !== undefined),
    map((privateUserData) => privateUserData.stripeCustomerId)
  );
