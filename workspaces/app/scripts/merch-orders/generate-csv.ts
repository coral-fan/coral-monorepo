import fs from 'fs';
import path from 'path';

import { getCollectionReferenceServerSide, getDocumentData } from 'libraries/firebase';
import { MerchOrder, ShippingInfo } from 'libraries/models';
import { Stringifier, stringify } from 'csv-stringify';

const COLLECTION_ID = '0x108e06a8c2C4197c0209518cA509d7b21B49740e';

const merchOrdersColumns = ['Merch Order ID', 'User ID', 'Shipping Address', 'Processed'];
const columnLength = merchOrdersColumns.length;

const generateCSV = async () => {
  const merchOrderCollectionRef = await getCollectionReferenceServerSide<MerchOrder>(
    'merch-orders'
  );

  const merchOrderQuerySnapshots = await merchOrderCollectionRef
    .where('collectionId', '==', COLLECTION_ID)
    .where('status', '==', 'confirmed')
    .get();

  let stringifier: Stringifier | undefined = undefined;

  const merchOrderSnapshots = merchOrderQuerySnapshots.docs;

  for (const merchOrderSnapshot of merchOrderSnapshots) {
    const { options, shippingInfoId, userId } = merchOrderSnapshot.data();

    if (options !== null && merchOrdersColumns.length === columnLength) {
      for (const { type } of options) {
        merchOrdersColumns.splice(
          merchOrdersColumns.length - 1,
          0,
          type[0].toUpperCase() + type.substring(1)
        );
      }
    }

    if (stringifier === undefined) {
      stringifier = stringify({ header: true, columns: merchOrdersColumns });
    }

    const merchOrderId = merchOrderSnapshot.id;

    const shippingInfo = await getDocumentData<ShippingInfo>('shipping-info', shippingInfoId);

    if (shippingInfo === undefined) {
      throw `Shipping info ${shippingInfoId} is undefined`;
    }

    const { firstName, lastName, addressLineOne, addressLineTwo, city, state, zipCode } =
      shippingInfo;

    const address = `${firstName} ${lastName}, ${addressLineOne}${
      addressLineTwo ? ` ${addressLineTwo}` : ''
    }, ${city}, ${state}, ${zipCode}`;

    const optionValues = options === null ? [] : options.map(({ value }) => value);

    if (stringifier === undefined) {
      throw 'stringifier cannot be undefined.';
    }

    stringifier.write([merchOrderId, userId, address, ...optionValues, 'NO']);
  }

  const writableStream = fs.createWriteStream(
    path.join(__dirname, `${COLLECTION_ID}_merch-orders.csv`)
  );

  if (stringifier === undefined) {
    throw 'stringifier cannot be undefined.';
  }
  stringifier.pipe(writableStream);
};

console.log('writing CSV...');
generateCSV().catch(console.error);
