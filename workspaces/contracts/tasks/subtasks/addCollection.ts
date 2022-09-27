import {
  getDocumentReferenceServerSide,
  getPublicFileUrl,
  getStorageBucket,
  initializeFirebaseAdmin,
} from '@coral/firebase';
import { ArtistData, CollectionData, CollectionType } from '@coral/models';
import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'fs/promises';
import { FieldValue } from 'firebase-admin/firestore';
import { subtask } from 'hardhat/config';
import { config } from 'dotenv';
import { getConfigFilePath, getImagePath } from 'tasks/utils/utils';
import { Network } from 'tasks/utils/getDeploymentConsts';
import path from 'path';

export const addCollection = subtask('addCollection', 'Add collection to Firebase')
  .addParam('projectDir', 'The project directory')
  .setAction(async ({ projectDir }, hre) => {
    console.log('\n Adding collection...');

    const network = hre.network.name as Network;

    const __dirname = path.resolve();
    const envVariablePath =
      network === 'mainnet' ? '/../app/.env.production.local' : '/../app/.env.development.local';

    config({ path: __dirname + envVariablePath });

    await initializeFirebaseAdmin();

    // Get config file
    const configFilePath = getConfigFilePath(projectDir);
    const projectData = await readFile(configFilePath, 'utf8');
    const configFile = JSON.parse(projectData);

    const { contract, collectionData } = configFile;
    const { name, address, description, maxSupply, usdPricePerToken, maxTokensPerWallet } =
      contract;
    const {
      artistId,
      type,
      dropTime,
      details,
      gatedContent,
      merchOptions,
      accessGrantingTokenAddresses,
    } = collectionData;

    const artistRef = await getDocumentReferenceServerSide<ArtistData>('artists', artistId);

    const artistDocSnapshot = await artistRef.get();

    if (!artistDocSnapshot.exists) {
      throw Error(`artist with id ${artistId} doesn't exist.`);
    }

    /*
    Handle Image
    */
    const storageBucketName = process.env.FIREBASE_STORAGE_BUCKET;

    if (!storageBucketName) {
      throw 'storageBucketName not found';
    }

    const bucket = await getStorageBucket();
    const imagePath = getImagePath(projectDir);
    const uuid = uuidv4();

    const uploadResponse = await bucket.upload(imagePath, {
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

    const fileUrl = getPublicFileUrl(uploadResponse[0].name, uuid);

    const collectionRef = await getDocumentReferenceServerSide<CollectionData>(
      'collections',
      address
    );

    const collectionDocSnapshot = await collectionRef.get();

    if (collectionDocSnapshot.exists) {
      throw Error(`collection with id ${address} already exists.`);
    }

    const collection: CollectionData = {
      name,
      artistId,
      imageUrl: fileUrl,
      maxSupply,
      type: type as CollectionType,
      price: usdPricePerToken,
      dropTime,
      description,
      details,
      gatedContent,
      maxMintablePerWallet: maxTokensPerWallet,
      accessGrantingTokenAddresses,
      merchOptions,
    };

    await collectionRef.set(collection);

    await artistRef.update({
      collectionIds: FieldValue.arrayUnion(address),
    });

    console.log('\n Collection added!');
  });
