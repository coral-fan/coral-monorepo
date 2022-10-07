import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { Collection, MerchOrder } from 'libraries/models';

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
  if (status === 'confirmed') {
    const merchOrderSnapshot = await merchOrderDocumentRef.get();
    const merchOrderData = merchOrderSnapshot.data();
    if (merchOrderData === undefined) {
      throw `merch order ${id} doesn't exist in database.`;
    }

    const { collectionId, options } = merchOrderData;
    // checks that merch order has options
    if (options !== undefined) {
      const collectionDocumentRef = await getDocumentReferenceServerSide<Collection>(
        'collections',
        collectionId
      );
      const collectionSnapshot = await collectionDocumentRef.get();
      const collectionData = collectionSnapshot.data();

      if (collectionData === undefined) {
        throw `collection ${collectionId} doesn't exist in database.`;
      }

      const { merchOptions } = collectionData;

      let currentMerchOptions = merchOptions;

      // below logic exists to properly decrement option quantities

      //  checks that merch options exists for current collection
      if (currentMerchOptions !== undefined) {
        /** create map for constant time look up of type and value since the option order in the array may not be in the same order as how it's nested in merchOptions
            example:
            options = [{size: 'sm'}, {color: 'red'}] (typing is {type: string}[])
            merchOptions = {
              type: 'color'
              ...
              subOptions: [
                {
                  type: 'size'
                },
                ...
              ]
            }
        */
        const optionsMap = new Map(options.map(({ type, value }) => [type, value]));
        // keep updating quantities values until there are no more merch option quantities to update
        while (currentMerchOptions !== undefined) {
          const value = optionsMap.get(currentMerchOptions.type);

          if (value === undefined) {
            throw `merch option type ${currentMerchOptions.type} for collection ${collectionId} not present in options ([${options}]) array in merch order ${id}`;
          }

          // get index of value because corresponding merchOptions in subOptions is indexed by the same value as the parent merchOption
          const valueIndex = currentMerchOptions.values.indexOf(value);
          // decrement quantity
          currentMerchOptions.quantities[valueIndex]--;
          // traverse to next merch options
          currentMerchOptions = currentMerchOptions.subOptions
            ? currentMerchOptions.subOptions[valueIndex]
            : undefined;
        }

        // because quantities stored in array, changing value in array changes the root merch options object
        await collectionDocumentRef.set({ merchOptions }, { merge: true });
      }
    }
  }
  const result = await merchOrderDocumentRef.set({ status }, { merge: true });

  return result.writeTime;
};

export const updateMerchOrderTransactionHash = async (id: string, transactionHash: string) => {
  const merchOrderDocumentRef = await getMerchOrderDocRef(id);
  const result = await merchOrderDocumentRef.set({ transactionHash }, { merge: true });

  return result.writeTime;
};
