import voucherCodes from 'voucher-code-generator';
import fs from 'fs';
import path from 'path';
import { stringify } from 'csv-stringify';

import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { RedeemCode } from 'libraries/models';

const codes = voucherCodes.generate({
  count: 100,
  length: 8,
});

const collectionId = 'test';

const stringifier = stringify({ header: true, columns: ['Redeem Codes'] });

const filename = `Redeem Codes For Collection ${collectionId}.csv`;
const filePath = path.join(__dirname, filename);

if (fs.existsSync(filePath)) {
  console.error(`${filename} already exists.`);
} else {
  const writableStream = fs.createWriteStream(filePath);

  const DEFAULT_REDEEM_CODE_DATA: RedeemCode = {
    isRedeemed: false,
    transactionHash: null,
  };

  console.log(`adding codes to database for collection ${collectionId}...`);

  getCollectionReferenceServerSide(`app/redeem-codes/${collectionId}`).then(
    async (collectionRedeemCodesCollectionRef) => {
      const redeemCodesCollectionQuerySnapshot = await collectionRedeemCodesCollectionRef
        .limit(1)
        .get();

      if (!redeemCodesCollectionQuerySnapshot.empty) {
        throw `Redeem codes for collection ${collectionId} already exists!`;
      } else {
        for (const code of codes) {
          console.log(`Adding code ${code}...`);
          await collectionRedeemCodesCollectionRef.doc(code).set(DEFAULT_REDEEM_CODE_DATA);
          stringifier.write([code]);
        }
        console.log(`codes added to database for collection ${collectionId}!`);

        console.log('writing CSV...');

        stringifier.pipe(writableStream);
      }
    }
  );
}
