export const getNftSmartContractAddress = (addresses: string[], matchedAddresses: string[]) => {
  let nftContractAddressIndex = -1;
  const lowercasedAddresses = addresses.map((address) => address.toLowerCase());

  for (const matchAddress of matchedAddresses) {
    const index = lowercasedAddresses.indexOf(matchAddress);
    if (index !== -1) {
      nftContractAddressIndex = index;
      break;
    }
  }

  if (nftContractAddressIndex === -1) {
    throw new Error(
      `No match was found in addresses: [${addresses}] for any addresses in matchAddresses: [${matchedAddresses}]`
    );
  }

  const nftContractAddress = addresses[nftContractAddressIndex];

  return nftContractAddress;
};

import { getPurchaseDocumentReference } from '../../utils';
import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { PurchaseData } from 'libraries/models';

export const getPurchaseDocumentIdByTransactionHash = async (transactionHash: string) => {
  const purchaseCollectionRef = await getCollectionReferenceServerSide<PurchaseData>('purchases');

  const purchaseDocSnapshots = await purchaseCollectionRef
    .where('transactionHash', '==', transactionHash)
    .get();

  if (purchaseDocSnapshots.empty) {
    throw new Error(
      `No Purchase document exists for transaction hash ${transactionHash} in Firestore.`
    );
  }

  let purchases: Record<string, PurchaseData> = {};

  purchaseDocSnapshots.forEach((purchaseDocSnapshot) => {
    purchases = {
      ...purchases,
      [purchaseDocSnapshot.id]: purchaseDocSnapshot.data(),
    };
  });

  const purchaseEntries = Object.entries(purchases);

  if (purchaseEntries.length > 1) {
    purchaseEntries.forEach(async ([id]) => {
      const purchaseDocRef = await getPurchaseDocumentReference(id);
      await purchaseDocRef.set({ status: 'rejected' }, { merge: true });
    });

    throw new Error(
      `There shouldn't be multiple purchases associated with hash ${transactionHash}.`
    );
  }

  const [[id]] = purchaseEntries;

  return id;
};
