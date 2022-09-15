import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse';
import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { MerchOrder } from 'libraries/models';

const COLLECTION_ID = '0x108e06a8c2C4197c0209518cA509d7b21B49740e';

const getMerchOrderIds = () =>
  new Promise<string[]>((resolve) => {
    const merchOrderIds: string[] = [];
    fs.createReadStream(path.join(__dirname, `${COLLECTION_ID}_merch-orders.csv`))
      .pipe(
        parse({
          from_line: 2,
        }).on('data', async ([merchOrderId]) => {
          merchOrderIds.push(merchOrderId);
        })
      )
      .on('end', () => resolve(merchOrderIds));
  });

const updateStatus = async () => {
  const merchOrderIds = await getMerchOrderIds();

  for (const merchOrderId of merchOrderIds) {
    const merchOrderDocRef = await getDocumentReferenceServerSide<MerchOrder>(
      'merch-orders',
      merchOrderId
    );
    await merchOrderDocRef.set({ status: 'fulfilled' }, { merge: true });
  }
};

updateStatus().catch((error) => console.log(error));
