import { getApp } from 'firebase/app';
import {
  getFirestore as getFirestoreClientSide,
  doc,
  getDoc,
  DocumentReference,
} from 'firebase/firestore';
import { initializeFirebaseAdmin, initializeFirebaseApp } from '.';

const isServerSide = () => typeof window === 'undefined';

const getFirestoreServerSide = async () => {
  initializeFirebaseAdmin();
  const { getApp } = await import('firebase-admin/app');
  const app = getApp();
  const { getFirestore } = await import('firebase-admin/firestore');
  return getFirestore(app);
};

const getDocumentReferenceServerSide = async (collection: string, id: string) => {
  const firestore = await getFirestoreServerSide();
  return firestore.doc(`${collection}/${id}`);
};

const getDocumentReferenceClientSide = async (collection: string, id: string) => {
  initializeFirebaseApp();
  const app = getApp();
  const firestore = getFirestoreClientSide(app);
  return doc(firestore, collection, id);
};

export const getDocumentReference = (collection: string, id: string) =>
  (isServerSide() ? getDocumentReferenceServerSide : getDocumentReferenceClientSide)(
    collection,
    id
  );

export const getDocumentSnapshot = async (collection: string, id: string) => {
  const documentReference = await getDocumentReference(collection, id);
  // checks if documentReference is instance of DocumentReference which is from firebase/firestore (client side only)
  return documentReference instanceof DocumentReference
    ? getDoc(documentReference)
    : documentReference.get();
};
