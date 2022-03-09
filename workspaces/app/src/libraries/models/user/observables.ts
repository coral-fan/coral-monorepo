import { getAuth } from 'firebase/auth';
import { getCollectionReferenceClientSide, getDocumentData } from 'libraries/firebase';
import { user } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';
import { filter, map, mergeMap } from 'rxjs';
import { User } from './types';

// client side only
const getFirebaseUser$ = () => {
  const auth = getAuth();
  return user(auth);
};

// client side only
export const getUserUid$ = () => getFirebaseUser$().pipe(map((user) => user?.uid));

// client side only
export const getUsernames$ = () => {
  const usersCollectionReference = getCollectionReferenceClientSide('users');
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
