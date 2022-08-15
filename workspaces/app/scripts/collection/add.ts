import { isAddress } from '@ethersproject/address';
import {
  getDocumentReferenceServerSide,
  getPublicFileUrl,
  getStorageBucket,
} from 'libraries/firebase';
import { ArtistData, CollectionData, CollectionType } from 'libraries/models';
import { v4 as uuidv4 } from 'uuid';
import { readFile } from 'fs/promises';
import { FieldValue } from 'firebase-admin/firestore';

import { parseProjectName, getConfigFilePath, getImagePath } from '@coral/contracts/tasks/utils';

const projectName = process.argv[2];

const parseAccessGrantingTokenAddresses = (addressesArguement: string) => {
  if (addressesArguement === undefined) {
    return null;
  }

  const accessGrantingTokenAddresses = JSON.parse(addressesArguement);

  if (!Array.isArray(accessGrantingTokenAddresses)) {
    throw 'accessGrantingTokenAddresses must be an array.';
  }

  if (accessGrantingTokenAddresses.some((address) => !isAddress(address))) {
    throw `All elements in accessGrantingTokenAddresses [${accessGrantingTokenAddresses}] must be a valid address.`;
  }

  return accessGrantingTokenAddresses;
};

const accessGrantingTokenAddresses = parseAccessGrantingTokenAddresses(process.argv[3]);

const addCollection = async (projectName: string) => {
  console.log('Adding collection...');

  // Get config file
  const projectDir = parseProjectName(projectName);
  const configFilePath = getConfigFilePath(projectDir);
  const projectData = await readFile(configFilePath, 'utf8');
  const configFile = JSON.parse(projectData);

  const { contract, collectionData } = configFile;
  const { name, address, description, maxSupply, usdPricePerToken, maxTokensPerWallet } = contract;
  const { artistId, type, dropTime, details, gatedContent, merchOptionTypes } = collectionData;

  const artistRef = await getDocumentReferenceServerSide<ArtistData>('artists', artistId);

  const artistDocSnapshot = await artistRef.get();

  if (!artistDocSnapshot.exists) {
    throw Error(`artist with id ${artistId} doesn't exist.`);
  }

  /*
  Handle Image
  */
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
    merchOptionTypes,
  };

  await collectionRef.set(collection);

  await artistRef.update({
    collectionIds: FieldValue.arrayUnion(address),
  });

  console.log('Collection added!');
};

addCollection(projectName);
