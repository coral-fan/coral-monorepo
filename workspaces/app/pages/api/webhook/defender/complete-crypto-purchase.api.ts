import { NextApiRequest, NextApiResponse } from 'next';
import {
  BlockTriggerEvent,
  EventConditionSummary,
  SentinelConditionRequest,
  SubscriberType,
} from 'defender-autotask-utils';
import { number, object } from 'yup';
import { Handler } from '../../types';
import { getPurchaseDocumentIdByTransactionHash } from './utils';
import { getHandler, getPurchaseDocumentReference } from '../../utils';

const transferParamsSchema = object({
  tokenId: number()
    .required()
    .transform((tokenId) => parseInt(tokenId)),
});

export const post: Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { events } = req.body as SentinelConditionRequest;
  if (events) {
    for (const sentinelTriggerEvent of events) {
      if (sentinelTriggerEvent.type === SubscriberType.BLOCK) {
        const { matchReasons, hash } = sentinelTriggerEvent as BlockTriggerEvent;
        for (const reason of matchReasons) {
          if (reason.type === 'event') {
            const { params, signature } = reason as EventConditionSummary;
            if (signature === 'Transfer(address,address,uint256)') {
              try {
                const { tokenId } = await transferParamsSchema.validate(params);

                const id = await getPurchaseDocumentIdByTransactionHash(hash);

                const purchaseDocRef = await getPurchaseDocumentReference(id);

                const purchaseDocSnapshot = await purchaseDocRef.get();

                const purchaseDocData = purchaseDocSnapshot.data();

                if (purchaseDocData === undefined) {
                  throw new Error(
                    `No Purchase document exists for transaction hash ${hash} in Firestore.`
                  );
                }

                await purchaseDocRef.set(
                  {
                    assetId: tokenId,
                    status: 'completed',
                  },
                  { merge: true }
                );
              } catch (e) {
                console.error(e);
              }
            }
          }
        }
      }
    }
  }
  return res.status(200).send('');
};

export default getHandler({ post });
