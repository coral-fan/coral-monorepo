import { getApp } from 'firebase/app';
import {
  getFirestore as getFirestoreClientSide,
  doc,
  getDoc,
  DocumentReference,
  collection as getCollection,
  DocumentData,
  CollectionReference,
  getDocs,
} from 'firebase/firestore';
import { initializeFirebaseAdmin } from '..';
import { isServerSide } from 'libraries/utils/environment';

const getFirestoreServerSide = async () => {
  await initializeFirebaseAdmin();
  const { getApp } = await import('firebase-admin/app');
  const app = getApp();
  const { getFirestore } = await import('firebase-admin/firestore');
  return getFirestore(app);
};

export const getDocumentReferenceServerSide = async <
  T extends FirebaseFirestore.DocumentData = FirebaseFirestore.DocumentData
>(
  collection: string,
  id: string,
  ...subpaths: string[]
) => {
  const firestore = await getFirestoreServerSide();
  return firestore.doc(
    `${collection}/${id}${subpaths.length > 0 ? `/${subpaths.join('/')}` : ''}`
  ) as FirebaseFirestore.DocumentReference<T>;
};

export const getDocumentReferenceClientSide = <T extends DocumentData>(
  collection: string,
  id: string,
  ...subpaths: string[]
) => {
  const app = getApp();
  const firestore = getFirestoreClientSide(app);
  return doc(firestore, collection, id, ...subpaths) as DocumentReference<T>;
};

export const getDocumentReference = async <T extends DocumentData>(
  collection: string,
  id: string,
  ...subpaths: string[]
) =>
  (isServerSide() ? getDocumentReferenceServerSide : getDocumentReferenceClientSide)<T>(
    collection,
    id,
    ...subpaths
  );

export const getDocumentData = async <T extends DocumentData>(
  collection: string,
  id: string,
  ...subpaths: string[]
) => {
  const documentReference = await getDocumentReference(collection, id, ...subpaths);
  // checks if documentReference is instance of DocumentReference which is from firebase/firestore (client side only)

  return (
    await (documentReference instanceof DocumentReference
      ? getDoc(documentReference)
      : documentReference.get())
  ).data() as T | undefined;
};

export const getCollectionReferenceClientSide = <T extends DocumentData>(collection: string) => {
  const app = getApp();
  const firestore = getFirestoreClientSide(app);
  return getCollection(firestore, collection) as CollectionReference<T>;
};

export const getCollectionReferenceServerSide = async <
  T extends FirebaseFirestore.DocumentData = FirebaseFirestore.DocumentData
>(
  collection: string
) => {
  const firestore = await getFirestoreServerSide();
  return firestore.collection(collection) as FirebaseFirestore.CollectionReference<T>;
};

export const getCollectionReference = async <T>(collection: string) => {
  return (isServerSide() ? getCollectionReferenceServerSide : getCollectionReferenceClientSide)<T>(
    collection
  );
};

export type DocumentDataWithId<T> = T & { id: string };

export const getAllDocuments = async <T extends DocumentData>(collection: string) => {
  const collectionRef = await getCollectionReference<T>(collection);

  const documentArray: DocumentDataWithId<T>[] = [];

  const querySnapshot = await (collectionRef instanceof CollectionReference
    ? getDocs(collectionRef)
    : collectionRef.get());

  querySnapshot.forEach((docSnapshot) => {
    documentArray.push({ id: docSnapshot.id, ...docSnapshot.data() });
  });

  return documentArray;
};

export const getDocumentExists = async <T extends DocumentData>(
  collection: string,
  id: string,
  ...subpaths: string[]
) => {
  const documentReference = await getDocumentReference<T>(collection, id, ...subpaths);

  return documentReference instanceof DocumentReference
    ? (await getDoc(documentReference)).exists()
    : (await documentReference.get()).exists;
};
