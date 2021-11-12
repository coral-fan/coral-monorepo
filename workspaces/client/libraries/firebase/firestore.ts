import { getApp } from 'firebase/app';
import { getFirestore, doc } from 'firebase/firestore';

export const getDocRef = (collection: string, id: string) => {
  const firebaseApp = getApp();
  const firestoreDb = getFirestore(firebaseApp);
  return doc(firestoreDb, collection, id);
};
