import { stringify } from 'csv-stringify';
import { getCollectionReferenceServerSide, getDocumentData } from 'libraries/firebase';
import { OwnedNfts, PrivateUserData, PublicUserData } from 'libraries/models';
import fs from 'fs';
import path from 'path';

const COLLECTIONS = [
  '0xc56E1b0734f25D17D7A68eb969f8eB00B287136d',
  '0xCa86C97A5f5D8906DAeF4Bc83Ad9665D5298d35B',
  '0x6CE6a08E467072477dceb8A7CEde763d18a6aB16',
  '0xf410D8bfBdd9464Cc5431466a74356d2B5339A28',
];

const columns = ['User ID', 'Username', 'Email', 'Opted Into Marketing'];
const stringifier = stringify({ header: true, columns });

const generateCSV = async () => {
  const nftOwnershipCollectionRef = await getCollectionReferenceServerSide<OwnedNfts>(
    'nft-ownership'
  );
  const nftOwnershipQuerySnapshots = await nftOwnershipCollectionRef.get();

  const usersWithCollection = new Set<string>();
  for (const ownedNftsSnapshot of nftOwnershipQuerySnapshots.docs) {
    const ownedNfts = ownedNftsSnapshot.data();
    for (const collection of COLLECTIONS) {
      if (collection in ownedNfts) {
        usersWithCollection.add(ownedNftsSnapshot.id);
      }
    }
  }
  for (const user of usersWithCollection) {
    const publicUserData = await getDocumentData<PublicUserData>('users', user);
    const privateUserData = await getDocumentData<PrivateUserData>('users', user, 'private/data');

    if (
      privateUserData !== undefined &&
      publicUserData !== undefined &&
      privateUserData.email !== null
    ) {
      stringifier.write([
        user,
        publicUserData.username,
        privateUserData.email,
        privateUserData.doesOptIntoMarketing ? 'Yes' : 'No',
      ]);
    }
  }

  const writableStream = fs.createWriteStream(path.join(__dirname, 'user-emails.csv'));

  stringifier.pipe(writableStream);
};

generateCSV();
