import { initializeFirebaseAdmin, getDocumentReferenceServerSide } from '@coral/firebase';
import { getCollection } from '@coral/models';
import { config } from 'dotenv';

config();

const test = async () => {
  await initializeFirebaseAdmin();
  const collectionData = await getCollection('0x108e06a8c2C4197c0209518cA509d7b21B49740e');
  console.log(collectionData);
};

test();
