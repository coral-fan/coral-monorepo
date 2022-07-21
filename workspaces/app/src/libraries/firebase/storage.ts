import { getStorage } from 'firebase-admin/storage';
import { initializeFirebaseAdmin } from './admin';

const storageBucketName = process.env.FIREBASE_STORAGE_BUCKET;

export const getStorageBucket = async () => {
  await initializeFirebaseAdmin();
  return getStorage().bucket(storageBucketName);
};

export const getPublicFileUrl = (destinationPath: string, accessToken: string) =>
  `https://firebasestorage.googleapis.com/v0/b/${storageBucketName}/o/${encodeURIComponent(
    destinationPath
  )}?alt=media&token=${accessToken}`;
