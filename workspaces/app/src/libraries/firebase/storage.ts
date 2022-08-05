import { getStorage } from 'firebase-admin/storage';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';
import { initializeFirebaseAdmin } from './admin';

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
};

// export const getNamedStorageBucket = async (namedStorageBucket: string) => {
//   await initializeFirebaseAdmin();
//   return getStorage().bucket(namedStorageBucket);
// };

export const getPublicFileUrl = (destinationPath: string, accessToken: string) =>
  `https://firebasestorage.googleapis.com/v0/b/${storageBucketName}/o/${encodeURIComponent(
>>>>>>> 2e639e7a (Parameterize getStorageBucket, include default)
    destinationPath
  )}?alt=media&token=${accessToken}`;
};
