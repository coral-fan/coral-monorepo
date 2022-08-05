import { getStorage } from 'firebase-admin/storage';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';
import { initializeFirebaseAdmin } from './admin';

<<<<<<< HEAD
const getStorageBucketUrl = () => {
  const STORAGE_BUCKET_URL = process.env.FIREBASE_STORAGE_BUCKET_URL;
  if (STORAGE_BUCKET_URL === undefined) {
    throw new Error(getEnvironmentVariableErrorMessage('FIREBASE_STORAGE_BUCKET_URL'));
  }
  return STORAGE_BUCKET_URL;
};

<<<<<<< HEAD
export const getStorageBucket = async () => {
  const storageBucketUrl = getStorageBucketUrl();
  await initializeFirebaseAdmin();
  return getStorage().bucket(storageBucketUrl);
};

export const getPublicFileUrl = (destinationPath: string, accessToken: string) => {
  const storageBucketUrl = getStorageBucketUrl();

  return `https://firebasestorage.googleapis.com/v0/b/${storageBucketUrl}/o/${encodeURIComponent(
=======
export const getStorageBucket = async (_storageBucket: string | undefined = storageBucketName) => {
  await initializeFirebaseAdmin();
  return getStorage().bucket(_storageBucket);
=======
const getStorageBucketName = () => {
  const storageBucketName = process.env.FIREBASE_STORAGE_BUCKET;

  if (!storageBucketName) {
    throw 'Storage bucket not found';
  }

  return storageBucketName;
>>>>>>> 5304fe12 (Update getStorageBucket logic)
};

export const getStorageBucket = async () => {
  const storageBucketName = getStorageBucketName();

  await initializeFirebaseAdmin();
  return getStorage().bucket(storageBucketName);
};

<<<<<<< HEAD
export const getPublicFileUrl = (destinationPath: string, accessToken: string) =>
  `https://firebasestorage.googleapis.com/v0/b/${storageBucketName}/o/${encodeURIComponent(
>>>>>>> 2e639e7a (Parameterize getStorageBucket, include default)
=======
export const getPublicFileUrl = (destinationPath: string, accessToken: string) => {
  const storageBucketName = getStorageBucketName();

  return `https://firebasestorage.googleapis.com/v0/b/${storageBucketName}/o/${encodeURIComponent(
>>>>>>> 5304fe12 (Update getStorageBucket logic)
    destinationPath
  )}?alt=media&token=${accessToken}`;
};
