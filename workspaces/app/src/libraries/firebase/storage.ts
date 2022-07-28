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

export const getStorageBucket = async () => {
  const storageBucketUrl = getStorageBucketUrl();
  await initializeFirebaseAdmin();
  return getStorage().bucket(storageBucketUrl);
};

export const getPublicFileUrl = (destinationPath: string, accessToken: string) => {
  const storageBucketUrl = getStorageBucketUrl();

  return `https://firebasestorage.googleapis.com/v0/b/${storageBucketUrl}/o/${encodeURIComponent(
    destinationPath
  )}?alt=media&token=${accessToken}`;
};
