import { getDocumentReferenceServerSide, initializeFirebaseAdmin } from 'libraries/firebase';
import { ArtistData, CollectionData, CollectionType } from 'libraries/models';
import { getStorage } from 'firebase-admin/storage';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import { readFile } from 'fs/promises';
import { FieldValue } from 'firebase-admin/firestore';

/*
Utility Functions
*/
// TODO: Create shared library for file / path functions for app and contract workspaces
const parseProjectName = (projectName: string) =>
  projectName
    .replace(/^\.*\/|\/|\/?[^\/]+\.[a-z]+|\/$/g, '')
    .replaceAll(' ', '-')
    .toLowerCase();

const getImagePath = (projectDir: string) => {
  const __dirname = path.resolve();
  return path.resolve(__dirname, '..', 'contracts', 'projects', projectDir, 'image', 'image.png');
};

const getConfigFilePath = (projectDir: string) => {
  const __dirname = path.resolve();
  return path.resolve(__dirname, '..', 'contracts', 'projects', projectDir, 'config.json');
};

/*
Script pulls collection name in from arguments.
`projectName` refers to the directory name in `contracts/projects` where configuration files
and assets are stored.
*/
const projectName = process.argv[2];

const addCollection = async (projectName: string) => {
  console.log('Adding collection...');

  // Get config file
  const projectDir = parseProjectName(projectName);
  const configFilePath = getConfigFilePath(projectDir);
  const projectData = await readFile(configFilePath, 'utf8');
  const configFile = JSON.parse(projectData);

  const { contract, collectionData } = configFile;
  const { name, address, description, maxSupply, usdPricePerToken, maxTokensPerWallet } = contract;
  const { artistId, type, dropDate, details, gatedContent } = collectionData;

  const artistRef = await getDocumentReferenceServerSide<ArtistData>('artists', artistId);

  const artistDocSnapshot = await artistRef.get();

  if (!artistDocSnapshot.exists) {
    throw Error(`artist with id ${artistId} doesn't exist.`);
  }

  /*
  Handle Image
  */
  await initializeFirebaseAdmin();
  const { getApp } = await import('firebase-admin/app');
  const app = getApp();
  const imagePath = getImagePath(projectDir);
  const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;

  const uuid = uuidv4();

  const uploadResponse = await getStorage(app)
    .bucket(storageBucket)
    .upload(imagePath, {
      destination: `collections/${address}/image.png`,
      gzip: true,
      contentType: 'image/png',
      metadata: {
        contentType: 'image/png',
        metadata: {
          firebaseStorageDownloadTokens: uuid,
        },
      },
    });

  const fileName = uploadResponse[0].name;
  const fileUrl = `https://firebasestorage.googleapis.com/v0/b/${storageBucket}/o/${encodeURIComponent(
    fileName
  )}?alt=media&token=${uuid}`;

  const collectionRef = await getDocumentReferenceServerSide<CollectionData>(
    'collections',
    address
  );

  const collectionDocSnapshot = await collectionRef.get();

  if (collectionDocSnapshot.exists) {
    throw Error(`collection with id ${address} already exists.`);
  }

  const collection: CollectionData = {
    name: name,
    artistId: artistId,
    imageUrl: fileUrl,
    maxSupply,
    type: type as CollectionType,
    price: usdPricePerToken,
    dropTime: dropDate,
    description: description,
    details: details,
    gatedContent: gatedContent,
    maxMintablePerWallet: maxTokensPerWallet,
  };

  await collectionRef.set(collection);

  await artistRef.update({
    collectionIds: FieldValue.arrayUnion(address),
  });

  console.log('Collection added!');
};

addCollection(projectName);
