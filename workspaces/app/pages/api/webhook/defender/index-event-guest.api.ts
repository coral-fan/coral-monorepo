import { NextApiRequest, NextApiResponse } from 'next';
import {
  BlockTriggerEvent,
  EventConditionSummary,
  SentinelConditionRequest,
  SubscriberType,
} from 'defender-autotask-utils';
import { ethers } from 'ethers';
import { number, object, string } from 'yup';

import { Handler } from '../../types';
import { getHandler } from '../../utils';
import { getNftSmartContractAddress } from './utils';
import { getDocumentReferenceServerSide } from 'libraries/firebase';
import { EventGuestLists } from 'libraries/models/eventGuestLists';

const transferParamsSchema = object({
  from: string().required(),
  to: string().required(),
  tokenId: number()
    .required()
    .transform((tokenId) => parseInt(tokenId)),
});

const isNotZeroAddress = (address: string) => address !== ethers.constants.AddressZero;

export const post: Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { events } = req.body as SentinelConditionRequest;
  if (events) {
    for (const sentinelTriggerEvent of events) {
      if (sentinelTriggerEvent.type === SubscriberType.BLOCK) {
        const {
          matchReasons,
          matchedAddresses,
          sentinel: { addresses },
        } = sentinelTriggerEvent as BlockTriggerEvent;
        for (const reason of matchReasons) {
          if (reason.type === 'event') {
            const { params, signature } = reason as EventConditionSummary;
            if (signature === 'Transfer(address,address,uint256)') {
              try {
                const { from, to } = await transferParamsSchema.validate(params);
                const nftContractAddress = getNftSmartContractAddress(addresses, matchedAddresses);

                const eventGuestListsDocRef = await getDocumentReferenceServerSide<EventGuestLists>(
                  'app',
                  'event-guest-lists'
                );

                let eventGuestListsSnapshot = await eventGuestListsDocRef.get();

                if (!eventGuestListsSnapshot.exists) {
                  await eventGuestListsDocRef.set({});
                  eventGuestListsSnapshot = await eventGuestListsDocRef.get();
                }

                const eventGuestLists = eventGuestListsSnapshot.data();

                if (eventGuestLists === undefined) {
                  throw new Error('event-guest-lists document is undefined in database.');
                }

                const userIdsSet = new Set(eventGuestLists[nftContractAddress]?.userIds ?? []);

                userIdsSet.add(to);

                if (isNotZeroAddress(from)) {
                  userIdsSet.delete(from);
                }

                await eventGuestListsDocRef.update({
                  [nftContractAddress]: {
                    userIds: Array.from(userIdsSet),
                  },
                });
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
