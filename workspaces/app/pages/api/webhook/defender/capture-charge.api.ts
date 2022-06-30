import { NextApiRequest, NextApiResponse } from 'next';
import {
  BlockTriggerEvent,
  EventConditionSummary,
  SentinelConditionRequest,
  SubscriberType,
} from 'defender-autotask-utils';
import { number, object } from 'yup';

import { Handler } from '../../types';
import { getHandler, getPurchaseDocumentReference, getStripe } from '../../utils';
import { getCollectionReferenceServerSide } from 'libraries/firebase';
import { PurchaseData } from 'libraries/models';
import { updateMerchOrderStatus } from '../../merch-order/utils';

const relayMintParamsSchema = object({
  tokenId: number()
    .required()
    .transform((tokenId) => parseInt(tokenId)),
});

export const post: Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { events } = req.body as SentinelConditionRequest;
  if (events) {
    for (const sentinelTriggerEvent of events) {
      if (sentinelTriggerEvent.type === SubscriberType.BLOCK) {
        const { hash, matchReasons } = sentinelTriggerEvent as BlockTriggerEvent;
        for (const reason of matchReasons) {
          if (reason.type === 'event') {
            const { params, signature } = reason as EventConditionSummary;
            // TODO: revert back to exact signature?
            if (signature.includes('RelayMint')) {
              try {
                const { tokenId } = await relayMintParamsSchema.validate(params);

                const purchaseCollectionRef = await getCollectionReferenceServerSide<PurchaseData>(
                  'purchases'
                );

                const purchaseDocSnapshots = await purchaseCollectionRef
                  .where('transactionHash', '==', hash)
                  .get();

                if (purchaseDocSnapshots.empty) {
                  throw new Error(
                    `No Purchase document exists for transaction hash ${hash} in Firestore.`
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
                    `There shouldn't be multiple purchases associated with hash ${hash}.`
                  );
                }

                const [[id, { metadata }]] = purchaseEntries;

                const purchaseDocRef = await getPurchaseDocumentReference(id);

                try {
                  if (metadata?.stripePaymentIntentId) {
                    const stripe = getStripe();
                    await stripe.paymentIntents.capture(metadata.stripePaymentIntentId);

                    await purchaseDocRef.set(
                      {
                        assetId: tokenId,
                        status: 'completed',
                      },
                      { merge: true }
                    );

                    if (metadata.merchOrderId) {
                      await updateMerchOrderStatus(metadata.merchOrderId, 'confirmed');
                    }
                  } else {
                    throw new Error(
                      `Either the metadata or metadata.stripePaymentIntentId is null or undefined respectively for purchase document with ${id}.`
                    );
                  }
                } catch (e) {
                  await purchaseDocRef.set({ status: 'rejected' }, { merge: true });
                  if (metadata?.merchOrderId) {
                    await updateMerchOrderStatus(metadata.merchOrderId, 'rejected');
                  }
                  throw e;
                }
              } catch (e) {
                console.error(e);
              }
            } else {
              throw new Error(`Signature ${signature} not expected for capture charge webhook.`);
            }
          }
        }
      }
    }
  }
  return res.status(200).send('');
};

export default getHandler({ post });
