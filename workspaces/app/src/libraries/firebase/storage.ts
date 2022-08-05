import { getStorage } from 'firebase-admin/storage';
import { getEnvironmentVariableErrorMessage } from 'libraries/utils';
import { initializeFirebaseAdmin } from './admin';

const getStorageBucketUrl = () => {
  const STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET;
  if (STORAGE_BUCKET === undefined) {
    throw new Error(getEnvironmentVariableErrorMessage('FIREBASE_STORAGE_BUCKET'));
  }
  return STORAGE_BUCKET;
};

export const getStorageBucket = async () => {
  const storageBucketName = getStorageBucketUrl();

  await initializeFirebaseAdmin();
  return getStorage().bucket(storageBucketName);
};

export const getPublicFileUrl = (destinationPath: string, accessToken: string) => {
  const storageBucketName = getStorageBucketUrl();

  return `https://firebasestorage.googleapis.com/v0/b/${storageBucketName}/o/${encodeURIComponent(
    destinationPath
  )}?alt=media&token=${accessToken}`;
};
