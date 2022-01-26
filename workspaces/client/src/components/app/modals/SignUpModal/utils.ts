import { setDoc } from 'firebase/firestore';
import { getDocumentReferenceClientSide } from 'libraries/firebase';

export const completeSignUp = async (username: string, email?: string, uid?: string) => {
  if (uid === undefined) {
    return false;
  }

  try {
    const userDocumentReference = await getDocumentReferenceClientSide('users', uid);

    const userData = email ? { username, email } : { username };

    await setDoc(userDocumentReference, userData);

    const isSigningUpDocRef = await getDocumentReferenceClientSide('is-signing-up', uid);

    await setDoc(isSigningUpDocRef, { isSigningUp: false });

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
