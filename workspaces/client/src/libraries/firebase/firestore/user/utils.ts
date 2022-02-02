import { getDoc, setDoc } from '@firebase/firestore';
import { getDocumentReferenceClientSide } from 'libraries/firebase';
import { User } from './types';
import { getDocumentData } from '..';

export const getIsSigningUp = async (uid: string) => {
  const isSigningUpData = await getDocumentData('is-signing-up', uid);

  if (isSigningUpData === undefined) {
    throw Error(
      'Data object for is signing up should not be undefined. Please that the uid you passed is valid.'
    );
  }

  return isSigningUpData.isSigningUp as Promise<boolean>;
};

/*
At Least One Type implementation from:
https://stackoverflow.com/questions/48230773/how-to-create-a-partial-like-that-requires-a-single-property-to-be-set/48244432
*/
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];

export const upsertUser = async (incomingUserData: AtLeastOne<User>, uid: string) => {
  if (uid === undefined) {
    return;
  }

  try {
    const userDocumentReference = await getDocumentReferenceClientSide('users', uid);
    const userDocumentSnapshot = await getDoc(userDocumentReference);

    await setDoc(
      userDocumentReference,
      userDocumentSnapshot.exists()
        ? incomingUserData
        : {
            /*
            Additional object destructure handles Typescript overwriting error, solution from:
            https://stackoverflow.com/questions/62596892/how-do-you-use-spread-operator-to-overwrite-properties-in-typescript
          */
            email: null,
            profilePhoto: null,
            creditCardInformation: null,
            notifications: [],
            assets: [],
            ...incomingUserData,
          },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};
