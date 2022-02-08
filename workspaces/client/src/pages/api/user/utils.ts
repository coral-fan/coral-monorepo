import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { IncomingUserData, PrivateUserData } from 'libraries/models';
import { USER_PROPERTIES, PRIVATE_USER_DATA_PROPERTIES } from './consts';

const extractData = <T, U>(data: T, keys: Set<keyof U>): Partial<U> =>
  Object.entries(data).reduce(
    (extractedData, [key, value]) =>
      // casting to prevent TS from throwing a hissy fit about Argument of type 'string' is not assignable to parameter of type 'keyof U'
      keys.has(key as keyof U) ? { ...extractedData, [key]: value } : extractedData,
    {}
  );
const isObjectEmpty = (object: Record<string, unknown>) => Object.keys(object).length === 0;

export const upsertUser = async (uid: string, incomingUserData: IncomingUserData) => {
  const userData = extractData(incomingUserData, USER_PROPERTIES);

  if (!isObjectEmpty(userData)) {
    const userDocRef = await getDocumentReferenceServerSide('users', uid);
    const userDocSnapshot = await userDocRef.get();
    await userDocRef.set(
      userDocSnapshot.exists
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
    const privateUserDataDocRef = await getDocumentReferenceServerSide(
      'users',
      uid,
      'private',
      'data'
    );

    const privateUserDataDocSnapshot = await privateUserDataDocRef.get();
    await privateUserDataDocRef.set(
      privateUserDataDocSnapshot.exists
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
