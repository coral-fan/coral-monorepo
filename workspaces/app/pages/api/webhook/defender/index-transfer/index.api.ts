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
import { getNftSmartContractAddress } from '../utils';

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
    // TODO: remove!
    console.log(JSON.stringify(events));
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
                const { from, to, tokenId } = await transferParamsSchema.validate(params);
                const nftContractAddress = getNftSmartContractAddress(addresses, matchedAddresses);
                if (isNotZeroAddress(from)) {
                  await removeNFTOwnership(from, nftContractAddress, tokenId);
                }
                if (isNotZeroAddress(to)) {
                  await addNFTOwnership(to, nftContractAddress, tokenId);
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
