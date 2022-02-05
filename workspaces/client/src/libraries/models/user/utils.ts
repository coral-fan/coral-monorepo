import { getDoc, setDoc } from '@firebase/firestore';
import { getDocumentReferenceClientSide } from 'libraries/firebase';
import { User } from './types';
import { getDocumentData } from 'libraries/firebase';
import { PrivateUserData } from '.';

export const getIsUserSigningUp = async (uid: string) => {
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

type IncomingUserData = AtLeastOne<User & PrivateUserData>;

const extractData = <T, U>(data: T, keys: (keyof U)[]): Partial<U> =>
  Object.entries(data).reduce(
    (extractedData, [key, value]) =>
      key in keys ? { ...extractedData, [key]: value } : extractedData,
    {}
  );

const USER_PROPERTIES: (keyof User)[] = ['assets', 'notifications', 'profilePhoto', 'username'];
const PRIVATE_USER_DATA_PROPERTIES: (keyof PrivateUserData)[] = ['creditCardInformation', 'email'];

const isObjectEmpty = (object: Record<string, unknown>) => Object.keys(object).length === 0;

export const upsertUser = async (uid: string, incomingUserData: IncomingUserData) => {
  if (uid === undefined) {
    throw Error('uid for user should not be undefined.');
  }

  const userData = extractData<IncomingUserData, User>(incomingUserData, USER_PROPERTIES);

  if (!isObjectEmpty(userData)) {
    const userDocumentReference = getDocumentReferenceClientSide('users', uid);
    const userDocumentSnapshot = await getDoc(userDocumentReference);
    await setDoc(
      userDocumentReference,
      userDocumentSnapshot.exists()
        ? userData
        : {
            profilePhoto: null,
            notifications: [],
            assets: [],
            ...userData,
          },
      { merge: true }
    );
  }

  const privateUserData = extractData<IncomingUserData, PrivateUserData>(
    incomingUserData,
    PRIVATE_USER_DATA_PROPERTIES
  );

  if (!isObjectEmpty(privateUserData)) {
    const privateUserDataDocumentReference = getDocumentReferenceClientSide(
      'users',
      uid,
      'private',
      'data'
    );
    const privateUserDataDocumentSnapshot = await getDoc(privateUserDataDocumentReference);

    await setDoc(
      privateUserDataDocumentReference,
      privateUserDataDocumentSnapshot.exists()
        ? privateUserData
        : {
            email: null,
            creditCardInformation: null,
            ...privateUserData,
          },
      { merge: true }
    );
  }
};
