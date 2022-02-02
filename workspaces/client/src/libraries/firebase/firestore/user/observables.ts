import { getAuth } from 'firebase/auth';
import { getCollectionReferenceClientSide } from 'libraries/firebase';
import { user } from 'rxfire/auth';
import { collectionData } from 'rxfire/firestore';
import { map } from 'rxjs';

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
