import { getDocumentData } from 'libraries/firebase';
import { IsUserSigningUpData } from '.';

export const getIsUserSigningUp = async (uid: string) => {
  const isUserSigningUpData = await getDocumentData<IsUserSigningUpData>('is-signing-up', uid);

  return isUserSigningUpData?.isSigningUp ?? false;
};
