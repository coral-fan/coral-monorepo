import { NextApiRequest, NextApiResponse } from 'next';
import {
  BlockTriggerEvent,
  EventConditionSummary,
  SentinelConditionRequest,
  SubscriberType,
} from 'defender-autotask-utils';
import { ethers } from 'ethers';
import { number, object, string } from 'yup';

import { Handler } from '../../../types';
import { getHandler } from '../../../utils';
import { addNFTOwnership, removeNFTOwnership } from './utils';

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
          sentinel: {
            addresses: [contractAddress],
          },
        } = sentinelTriggerEvent as BlockTriggerEvent;
        for (const reason of matchReasons) {
          if (reason.type === 'event') {
            const { params, signature } = reason as EventConditionSummary;
            if (signature === 'Transfer(address,address,uint256)') {
              try {
                const { from, to, tokenId } = await transferParamsSchema.validate(params);
                if (isNotZeroAddress(from)) {
                  await removeNFTOwnership(from, contractAddress, tokenId);
                }
                if (isNotZeroAddress(to)) {
                  await addNFTOwnership(to, contractAddress, tokenId);
                }
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
