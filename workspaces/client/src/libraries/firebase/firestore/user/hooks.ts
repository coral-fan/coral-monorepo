import { getDoc, setDoc } from '@firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDocumentReferenceClientSide, NullableString, User } from 'libraries/firebase';
import { useObservable } from 'libraries/utils/hooks';
import { useMemo } from 'react';
import { getUsernames$, getUserUid$ } from './observables';

const getUserUid = () => getAuth().currentUser?.uid;

export const useUserUid = () => useObservable(getUserUid$, getUserUid());

export const useUsername = () => {
  const initialUsernames = useMemo(() => new Set<string>(), []);
  return useObservable(getUsernames$, initialUsernames);
};

export const createUpdateUser = async ({ ...incomingUserData }) => {
  const { uid } = incomingUserData;

  if (uid === undefined) {
    return;
  }

  try {
    const userDocumentReference = await getDocumentReferenceClientSide('users', uid);
    const userDocumentSnapshot = await getDoc(userDocumentReference);

    const userData: User = {
      email: null,
      username: null,
      profilePhoto: null,
      creditCardInformation: null,
      notifications: [],
      assets: [],
    };

    const existingUserData = userDocumentSnapshot.exists() ? userDocumentSnapshot.data() : userData;

    const updatedUserData = {
      ...existingUserData,
      ...incomingUserData,
    };

    await setDoc(userDocumentReference, updatedUserData, { merge: true });

    const isSigningUpDocRef = await getDocumentReferenceClientSide('is-signing-up', uid);

    await setDoc(isSigningUpDocRef, { isSigningUp: false });
  } catch (error) {
    console.log(error);
  }
};
