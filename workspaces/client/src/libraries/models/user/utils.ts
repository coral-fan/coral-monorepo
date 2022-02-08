import { getDocumentData } from 'libraries/firebase';

export const getIsUserSigningUp = async (uid: string) => {
  const isSigningUpData = await getDocumentData('is-signing-up', uid);

  const isSigningUp = isSigningUpData?.isSigningUp;

  return typeof isSigningUp === 'boolean' ? isSigningUp : false;
};
