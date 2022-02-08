import { getDocumentData } from 'libraries/firebase';

export const getIsUserSigningUp = async (uid: string) => {
  const isSigningUpData = await getDocumentData('is-signing-up', uid);

  if (isSigningUpData === undefined) {
    throw Error(
      'Data object for is signing up should not be undefined. Please that the uid you passed is valid.'
    );
  }

  return isSigningUpData.isSigningUp as Promise<boolean>;
};
