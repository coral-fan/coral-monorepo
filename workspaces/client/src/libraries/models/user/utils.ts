import { getDocumentData } from 'libraries/firebase';

export const getIsUserSigningUp = async (uid: string) => {
  const isSigningUpData = await getDocumentData<{ isSigningUp: boolean }>('is-signing-up', uid);

  return isSigningUpData?.isSigningUp ?? false;
};
