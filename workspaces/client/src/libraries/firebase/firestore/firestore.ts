import { getApp } from 'firebase/app';
import {
  getFirestore as getFirestoreClientSide,
  doc,
  getDoc,
  DocumentReference,
  collection as getCollection,
} from 'firebase/firestore';
import { initializeFirebaseAdmin } from '..';
import { isServerSide } from 'libraries/utils/environment';

const getFirestoreServerSide = async () => {
  initializeFirebaseAdmin();
  const { getApp } = await import('firebase-admin/app');
  const app = getApp();
  const { getFirestore } = await import('firebase-admin/firestore');
  return getFirestore(app);
};

export const getDocumentReferenceServerSide = async (
  collection: string,
  id: string,
  ...subpaths: string[]
) => {
  const firestore = await getFirestoreServerSide();
  return firestore.doc(`${collection}/${id}${subpaths.length > 0 ? `/${subpaths.join('/')}` : ''}`);
};

export const getDocumentReferenceClientSide = (
  collection: string,
  id: string,
  ...subpaths: string[]
) => {
  const app = getApp();
  const firestore = getFirestoreClientSide(app);
  return doc(firestore, collection, id, ...subpaths);
};

export const getDocumentReference = async (collection: string, id: string, ...subpaths: string[]) =>
  (isServerSide() ? getDocumentReferenceServerSide : getDocumentReferenceClientSide)(
    collection,
    id,
    ...subpaths
  );

export const getDocumentSnapshot = async (
  collection: string,
  id: string,
  ...subpaths: string[]
) => {
  const documentReference = await getDocumentReference(collection, id, ...subpaths);
  // checks if documentReference is instance of DocumentReference which is from firebase/firestore (client side only)
  return documentReference instanceof DocumentReference
    ? getDoc(documentReference)
    : documentReference.get();
};

export const getDocumentData = async (collection: string, id: string, ...subpaths: string[]) => {
  const documentReference = await getDocumentReference(collection, id, ...subpaths);
  // checks if documentReference is instance of DocumentReference which is from firebase/firestore (client side only)
  return (
    await (documentReference instanceof DocumentReference
      ? getDoc(documentReference)
      : documentReference.get())
  ).data();
};

export const getCollectionReferenceClientSide = (collection: string) => {
  const app = getApp();
  const firestore = getFirestoreClientSide(app);
  return getCollection(firestore, collection);
};
