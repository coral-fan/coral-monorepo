import { getDocumentReferenceServerSide } from 'libraries/firebase';

export const updateMerchOrderTransactionHash = async (id: string, transactionHash: string) => {
  const merchOrderDocumentRef = await getDocumentReferenceServerSide('merch-order', id);
  const merchOrderSnapshot = await merchOrderDocumentRef.get();

  if (!merchOrderSnapshot.exists) {
    throw new Error(`Merch order ${id} doesn't exist in database.`);
  }

  const result = await merchOrderDocumentRef.set({ transactionHash }, { merge: true });

  return result.writeTime;
};
