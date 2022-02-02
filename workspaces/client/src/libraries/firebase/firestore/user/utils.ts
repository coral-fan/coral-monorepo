import { getDoc, setDoc } from '@firebase/firestore';
import { getDocumentReferenceClientSide } from 'libraries/firebase';
import { User } from './types';

interface UserWithUid extends User {
  uid: string;
}

/*
At Least One Type implementation from:
https://stackoverflow.com/questions/48230773/how-to-create-a-partial-like-that-requires-a-single-property-to-be-set/48244432
*/

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
type PartialUser = AtLeastOne<UserWithUid>;

export const upsertUser = async (incomingUserData: PartialUser) => {
  const { uid } = incomingUserData;

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
            ...{
              email: null,
              profilePhoto: null,
              creditCardInformation: null,
              notifications: [],
              assets: [],
            },
            ...incomingUserData,
          },
      { merge: true }
    );
  } catch (error) {
    console.log(error);
  }
};
