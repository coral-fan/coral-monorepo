import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { MerchOrder } from 'libraries/models';

export const getMerchOrderDocRef = async (id: string) => {
  const merchOrderDocumentRef = await getDocumentReferenceServerSide<MerchOrder>(
    'merch-orders',
    id
  );
  const merchOrderSnapshot = await merchOrderDocumentRef.get();

  if (!merchOrderSnapshot.exists) {
    throw new Error(`Merch order ${id} doesn't exist in database.`);
  }

  return merchOrderDocumentRef;
};

export const updateMerchOrderStatus = async (id: string, status: MerchOrder['status']) => {
  const merchOrderDocumentRef = await getMerchOrderDocRef(id);
  const result = await merchOrderDocumentRef.set({ status }, { merge: true });

  return result.writeTime;
};

export const updateMerchOrderTransactionHash = async (id: string, transactionHash: string) => {
  const merchOrderDocumentRef = await getMerchOrderDocRef(id);
  const result = await merchOrderDocumentRef.set({ transactionHash }, { merge: true });

  return result.writeTime;
};
